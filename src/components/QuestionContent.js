import React from 'react';

let cofefe = '';

class QuestionContent extends React.Component {

  constructor(){
    super()

    this.state ={
      count: 10,
      shuffled: [],
      gameState: 1,
      timer: null
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
      window.addEventListener('keydown', this.handleBuzz);
      this.setState({count: 10, timer: window.setInterval(() => this.setState({count: this.state.count -1}), 500)});
  }

  updateBuzzer = () => {
    this.setState({count: 10, timer: window.setInterval(() => this.setState({count: this.state.count -1}), 500)});
  }

  cleanUpCount = () => {
    console.log("This is the timer", this.state.timer);
    console.log(this.state)
    // clearInterval(this.state.timer);
    console.log("This is the timer after clear", this.state.timer)
    this.setState({
      count: 10
    }, this.props.nextQuestion)
  }

  componentWillUpdate() {
    if (this.state.count === 0) {
      this.setState({
        count: 0
      })
      clearInterval(this.state.timer)
      this.startBuzzer();

      // this.cleanUpCount();
    }
  }

  handleBuzz = (event) => {
    if (this.state.gameState === 1) {
      if (event.code === "ShiftLeft") {
          alert("Player 1")
      } else if (event.code === "ShiftRight") {
          alert("Player 2")
      }
    }

  }

  //on buzz, reset time, keep track of points, correct answer triggers nextQuestion,
  //wrong answer disables that button, force player 2 to answer


  componentDidMount(){
    const allAnswersArray = [this.props.correctAnswer, ...this.props.incorrectAnswers]
    const shuffledArray = this.shuffle(allAnswersArray)
    this.setState({shuffled: shuffledArray}, this.startBuzzer());

  }

  componentWillReceiveProps(nextProps){
    const allAnswersArray = [nextProps.correctAnswer, ...nextProps.incorrectAnswers]
    const shuffledArray = this.shuffle(allAnswersArray)
    this.setState({shuffled: shuffledArray})
  }


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
