import React from 'react';
import QuestionContent from './QuestionContent';

class Question extends React.Component {

  constructor(){
    super()
    this.state = {
      questions: [],
      currentQuestion: 0
    }
  }

  componentDidMount(){
    this.getQuestions()
  }

  getQuestions = () => {
    let myBody = {difficulty: 'easy', category: '22'};
    fetch('http://localhost:3000/api/v1/get_questions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(myBody)})
    .then(resp => resp.json())
    .then(json => json.results)
    .then(results => this.setState({
      questions: results
    }))
}

  render () {
    console.log(this.state.questions)
    const currentQuestion = this.state.currentQuestion;
    return (
      <div>
        {this.state.questions.length ? <QuestionContent question={this.state.questions[currentQuestion].question} correctAnswer={this.state.questions[currentQuestion].correct_answer} incorrectAnswers={this.state.questions[currentQuestion].incorrect_answers}/> : 'Nothing'}
      </div>
    )
  }
}


export default Question;
