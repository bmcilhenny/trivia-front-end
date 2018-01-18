import React from 'react';
import QuestionContent from '../components/QuestionContent';

class QuestionContainer extends React.Component {

  constructor(){
    super()
    this.state = {
      questions: [],
      currentQuestion: 0,
      currentRound: 1
    }
  }

  componentDidMount(){
    this.getQuestions()
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
    } console.log(json); return json.results})
    .then(results => this.removeWeirdEncoding(results))
    .then(cleanedResults => this.setState({
      questions: cleanedResults, currentQuestion: 0
    }))
  }

  guess = (event) => {
    if (event.target.name === "correct") {
      alert("right!")
      //points, etc.
      this.nextQuestion()
    }else {
      alert("wrong!")
      //slops
    }

  }

  nextQuestion = () => {
    //are we at the end?  if so next round
    //otherwise load up next Q and re-render
    if (this.state.currentQuestion === 9) {
      this.nextRound()
    } else{
      this.setState({currentQuestion: this.state.currentQuestion + 1})
    }
  }

  nextRound = () => {
    if (this.state.currentRound === 3) {
      alert("game over!")
      //call game over function
    } else {
      this.setState({currentRound: this.state.currentRound + 1}, () => this.getQuestions())
    }

  }



  render () {
    console.log(this.state.questions)





    const currentQuestion = this.state.currentQuestion;
    return (
      <div>
        <h3>Current Round {this.state.currentRound}</h3>
        {this.state.questions.length ? <QuestionContent nextQuestion={this.nextQuestion} question={this.state.questions[currentQuestion].question} correctAnswer={this.state.questions[currentQuestion].correct_answer} incorrectAnswers={this.state.questions[currentQuestion].incorrect_answers} guess={this.guess}/> : 'Loading'}
      </div>
    )
  }
}


export default QuestionContainer;
