import React from 'react';

class QuestionContent extends React.Component {

  constructor(){
    super()

    this.state = {
      count: 10,
      shuffled: [],
      gameState: 1,
      timer: null,
      answeringPlayer: null,
      player1RoundScore: 0,
      player2RoundScore: 0,
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
      window.addEventListener('keydown', this.handleBuzzIn);
      this.setState({timer: window.setInterval(() => this.setState({count: this.state.count -1}), 1000)});
  }

  updateBuzzer = () => {
    clearInterval(this.state.timer)
    this.setState({count: 10, timer: window.setInterval(() => this.setState({count: this.state.count -1}), 1000)});
  }


  cleanUpCount = () => {
    console.log("This is the timer", this.state.timer);
    console.log(this.state)
    // clearInterval(this.state.timer);
    console.log("This is the timer after clear", this.state.timer)
    this.setState({
      count: 10
    })
  }

  componentWillUpdate() {
    if (this.state.count === 0) {
      this.setState({
        count: 0,
        gameState: 1
      }, this.props.nextQuestion)
      this.updateBuzzer();
      // this.cleanUpCount();
    }
  }

  handleBuzzIn = (event) => {
    if (this.state.gameState === 1) {
      if (event.code === "ShiftLeft") {
        this.updateBuzzer();
        this.setState({
          answeringPlayer: 1,
          gameState: 2,
        })
          alert("Player 1")
      } else if (event.code === "ShiftRight") {
        this.updateBuzzer();
        this.setState({
          answeringPlayer: 2,
          gameState: 2,
        })
      }
    }

  }

  //on buzz, reset time, keep track of points, correct answer triggers nextQuestion,
  //wrong answer disables that button, force player 2 to answer


  componentDidMount(){
    const allAnswersArray = [this.props.correctAnswer, ...this.props.incorrectAnswers]
    const shuffledArray = this.shuffle(allAnswersArray)
    this.setState({shuffled: shuffledArray}, () => this.startBuzzer());

  }

  componentWillReceiveProps(nextProps){
    const allAnswersArray = [nextProps.correctAnswer, ...nextProps.incorrectAnswers]
    const shuffledArray = this.shuffle(allAnswersArray)
    this.setState({shuffled: shuffledArray})
  }


  render(){
    console.log(this.state.gameState)
    return (
      <div>
        <h1>Question Time!</h1>
        <h2>{this.state.count} second left</h2>
        <h3>{this.props.question}</h3>
        {this.state.shuffled.map(answer => <button disabled={this.state.gameState == 1 ? true : false} onClick={this.props.guess} key={answer.id} name={answer === this.props.correctAnswer ? "correct" : "incorrect"} >{answer}</button>)}
      </div>
    )
  }
}

export default QuestionContent;
