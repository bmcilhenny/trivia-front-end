import React from 'react';
import QuestionContent from '../components/QuestionContent';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class QuestionContainer extends React.Component {

  constructor(){
    super()
    this.state = {
      questions: [],
      currentQuestion: 0,
      currentRound: 1,
      player1RoundsArray: [],
      player2RoundsArray: [],
      showGameOverScreen: false,
      game_id: null,
      player1_id: null,
      player2_id: null,
      category: ''
    }
  }

  componentDidMount(){
    this.getQuestions();
  }

  componentWillReceiveProps(nextProps) {
    this.setStateWithGameInfo(nextProps);
  }

  setStateWithGameInfo(nextProps) {
    this.setState({
      game_id: nextProps.gameId,
      player1_id: nextProps.user1Id,
      player2_id: nextProps.user2Id,
    }, () => console.log(this.state))
  }

  removeWeirdEncoding = (json) => {
    json.forEach(question => {
      question.question = question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
      question.correct_answer = question.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
      question.incorrect_answers[0] = question.incorrect_answers[0].replace(/&quot;/g, '"').replace(/&#039;/g, "'");
      question.incorrect_answers[1] = question.incorrect_answers[1].replace(/&quot;/g, '"').replace(/&#039;/g, "'");
      question.incorrect_answers[2] = question.incorrect_answers[2].replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    })
    return json;
  }



  getQuestions = () => {

    let currentDifficulty
    switch (this.state.currentRound) {
      case 1:
        currentDifficulty = "easy"
        break;
      case 2:
        currentDifficulty = "medium"
        break;
      case 3:
        currentDifficulty = "hard"
        break;
    }

    let randomCategory = Math.floor(Math.random() * (32 - 9 + 1)) + 9
    console.log("calling API with", randomCategory, currentDifficulty)

    let myBody = {difficulty: currentDifficulty, category: randomCategory};
    fetch('http://localhost:3000/api/v1/get_questions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(myBody)
    }).then(resp => resp.json())
    .then(json => {if (json.response_code === 1) {
        this.getQuestions();
    } console.log(json, json.response_code); return json.results})
    .then(results => this.removeWeirdEncoding(results))
    .then(cleanedResults => this.setState({
      questions: cleanedResults, currentQuestion: 0
    }))
  }

  // category: cleanedResults[0].category





  nextQuestion = () => {
    //are we at the end?  if so next round
    //otherwise load up next Q and re-render
    if (this.state.currentQuestion === 9) {
      this.nextRound()
    } else{
      this.setState({currentQuestion: this.state.currentQuestion + 1})
    }
  }

  gameOver = () => {
    this.saveRound();
    this.setState({
      currentRound: this.state.currentRound = 1, showGameOverScreen: true})
  }


  nextRound = () => {
    if (this.state.currentRound === 3) {

      this.setState({
        currentRound: this.state.currentRound + 1}, () => this.gameOver())
    } else {

      this.setState({
        currentRound: this.state.currentRound + 1}, () => this.getQuestions())
    }
  }

  saveRound = () => {
    console.log("Inside the save round:", this.state)
    this.state.player1RoundsArray.forEach((score, i) => {
      console.log(this.state.player1_id, this.state.player2_id, this.state.game_id)
      let myBody = {
        "user1_id": this.state.player1_id,
        "user1_score": score,
        "user2_id": this.state.player2_id,
        "user2_score": this.state.player2RoundsArray[i],
        "game_id": this.state.game_id,
        "category": this.state.category
      }

      fetch('http://localhost:3000/api/v1/rounds', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(myBody)
      }).then(resp => resp.json())
      .then(results => console.log(results))

    })
  }

  updateScore = (score1, score2) => {
    // console.log("updating total score", score1, score2)
    this.setState({
      player1RoundsArray: [...this.state.player1RoundsArray, score1],
      player2RoundsArray: [...this.state.player2RoundsArray, score2]
    }, () => console.log("updated total score", this.state.player1RoundsArray, this.state.player2RoundsArray))
  }


  render () {
    // console.log(this.state.questions)


    if (this.state.showGameOverScreen) {
      this.setState({showGameOverScreen: false})
      return <Redirect to={{
        pathname: '/gameover',
        state: { player1RoundsArray: this.state.player1RoundsArray,
        player2RoundsArray: this.state.player2RoundsArray}
       }
      } />
    }


    const currentQuestion = this.state.currentQuestion;
    return (
      <div>
        <h3>Current Round {this.state.currentRound}</h3>
        {this.state.questions.length ? <QuestionContent nextQuestion={this.nextQuestion} question={this.state.questions[currentQuestion].question} correctAnswer={this.state.questions[currentQuestion].correct_answer} incorrectAnswers={this.state.questions[currentQuestion].incorrect_answers} guess={this.guess} updateScore={this.updateScore} currentRound={this.state.currentRound} player1RoundsArray={this.state.player1RoundsArray} player2RoundsArray={this.state.player2RoundsArray}/> : 'Loading'}
      </div>
    )
  }
}


export default QuestionContainer;
