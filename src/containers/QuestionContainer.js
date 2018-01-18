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
      question.question = question.question.replace('&quot;', '"').replace('&#039;', "'");
      question.correct_answer = question.correct_answer.replace('&quot;', '"').replace('&#039;', "'");
      question.incorrect_answers[0] = question.incorrect_answers[0].replace('&quot;', '"').replace('&#039;', "'");
      question.incorrect_answers[1] = question.incorrect_answers[1].replace('&quot;', '"').replace('&#039;', "'");
      question.incorrect_answers[2] = question.incorrect_answers[2].replace('&quot;', '"').replace('&#039;', "'");
    })
    return json;
  }

  getQuestions = () => {
    let myBody = {difficulty: 'easy', category: '22'};
    fetch('http://localhost:3000/api/v1/get_questions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(myBody)
    }).then(resp => resp.json())
    .then(json => json.results)
    .then(results => this.removeWeirdEncoding(results))
    .then(cleanedResults => this.setState({
      questions: cleanedResults
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


export default QuestionContainer;
