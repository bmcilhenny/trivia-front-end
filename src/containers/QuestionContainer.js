import React from 'react';
import QuestionContent from '../components/QuestionContent';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class QuestionContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      questions: [],
      currentQuestion: 0,
      currentRound: 1,
      player1RoundsArray: [],
      player2RoundsArray: [],
      showGameOverScreen: false,
      category1: '',
      category2: '',
      category3: ''
    }
  }

  componentDidMount(){
    this.getQuestions();
  }

  //the api comes with weird encoding for special characters, removes that weird encoding
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

  // based on the current Round grabs 10 questions with the appropriate difficulty (Round 1: easy, Round 2: medium, Round 3: hard)
  // if there is a bad response code from the api regrab the questions
  //then set the state of Questions to the cleaned questions
  getQuestions = () => {
    let currentDifficulty;
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

    let randomCategory = Math.floor(Math.random() * (32 - 9 + 1)) + 9;

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
    }, this.setRoundCategory))
  }

  setRoundCategory = () => {
    console.log("setting the category")
    if (this.state.questions[0] === undefined) {
      return
    } else {
      switch (this.state.currentRound) {
        case 1:
          this.setState({category1: this.state.questions[0].category})
          break;
        case 2:
          this.setState({category2: this.state.questions[0].category})
          break;
        case 3:
          this.setState({category3: this.state.questions[0].category})
          break;
      }
    }
  }

  nextQuestion = () => {
    if (this.state.currentQuestion === 9) {
      this.nextRound()
    } else {
      this.setState({currentQuestion: this.state.currentQuestion + 1})
    }
  }

  //post the rounds to the db, then show the gameover screen and reset the state of current round to 1
  gameOver = () => {
    this.setState({
      currentRound: this.state.currentRound = 1, showGameOverScreen: true})
  }


  nextRound = () => {
    if (this.state.currentRound === 3) {

      this.setState({
        currentRound: this.state.currentRound + 1})
    } else {

      this.setState({
        currentRound: this.state.currentRound + 1}, () => this.getQuestions())
    }
  }

  saveRound = () => {
    this.state.player1RoundsArray.forEach((score, i) => {
      let myBody = {
        "user1_id": this.props.user1Id,
        "user1_score": score,
        "user2_id": this.props.user2Id,
        "user2_score": this.state.player2RoundsArray[i],
        "game_id": this.props.gameId,
        "category": this.state[`category${i +1}`]
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
    this.setState({
      currentRound: this.state.currentRound = 1, showGameOverScreen: true})
  }

  updateScore = (score1, score2) => {
    this.setState({
      player1RoundsArray: [...this.state.player1RoundsArray, score1],
      player2RoundsArray: [...this.state.player2RoundsArray, score2]
    }, () => this.state.currentRound === 4 ? this.saveRound() : null )
  }


  render () {
    console.log("Question container", this.state, this.props)
    if (this.state.showGameOverScreen) {
      this.setState({showGameOverScreen: false})
      return <Redirect to={{
        pathname: '/gameover',
        state: { player1RoundsArray: this.state.player1RoundsArray,
        player2RoundsArray: this.state.player2RoundsArray,
        gameId: this.props.gameId,
        user1Id: this.props.user1Id,
        user2Id: this.props.user2Id,
        category1: this.state.category1,
        category2: this.state.category2,
        category3: this.state.category3
       }
       }
      } />
    }

    const currentQuestion = this.state.currentQuestion;
    return (
      <div>
        <h3>Current Round {this.state.currentRound}</h3>
        {this.state.questions.length ? <QuestionContent nextQuestion={this.nextQuestion} question={this.state.questions[currentQuestion].question} correctAnswer={this.state.questions[currentQuestion].correct_answer} incorrectAnswers={this.state.questions[currentQuestion].incorrect_answers} guess={this.guess} updateScore={this.updateScore} currentRound={this.state.currentRound} player1RoundsArray={this.state.player1RoundsArray} player2RoundsArray={this.state.player2RoundsArray} saveRound={this.saveRound}/> : 'Loading'}
      </div>
    )
  }
}


export default QuestionContainer;
