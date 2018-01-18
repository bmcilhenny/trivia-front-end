import React from 'react';


class QuestionContent extends React.Component {

  constructor(){
    super()

    this.state ={
      count: 10,
      shuffled: []
    }
  }


  shuffle = (a) => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

  startBuzzer = () => {
    window.addEventListener('keydown', this.handleBuzz)

    window.setInterval(() => this.setState({count: this.state.count -1}), 1000)
  }

  handleBuzz = (event) => {
    console.log(event)
    if (event.code === "ShiftLeft") {
        alert("Player 1")
    } else if (event.code === "ShiftRight") {
        alert("Player 2")
    }
  }


  componentWillMount(){
    const allAnswersArray = [this.props.correctAnswer, ...this.props.incorrectAnswers]
    const shuffledArray = this.shuffle(allAnswersArray)
    this.setState({shuffled: shuffledArray}, this.startBuzzer());

  }
  //
  // componentWillUnmount(){
  //
  // }
  //
  // getBuzz = () => {
  //   setTimeOut(, 10000)
  // }


  render(){


  return (
    <div>
      <h1>Question Time!</h1>
      <h2>{this.state.count} second left</h2>
      <h3>{this.props.question}</h3>
      {this.state.shuffled.map(answer => <button onClick={this.props.guess} key={answer.id} name={answer === this.props.correctAnswer ? "correct" : "incorrect"} >{answer}</button>)}
    </div>
  )
}
}

export default QuestionContent;
