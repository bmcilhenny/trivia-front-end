import React from 'react'

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
    let myBody = {difficulty: 'easy', category: '22'}
    fetch('http://localhost:3000/api/v1/get_questions', {method: "POST", headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  body: JSON.stringify(myBody)})
  .then(resp => resp.json())
  .then(json => this.setState({questions: json.results}, () => console.log(this.state.questions))

}

  render () {
    return (<div>
      <h1>Question Time!</h1>
    <h3>{this.state.questions !== [] ?  "got something" : "Loading"}.</h3>

    </div>)
  }

// <h3>{this.state.questions[this.state.currentQuestion].question}</h3>
//this.state.questions[this.state.currentQuestion].question
}


export default Question
