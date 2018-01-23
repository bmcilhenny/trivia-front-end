

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
      showAnswer: false,
      correctAnswer: ''
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
      this.setState({timer: window.setInterval(() => this.setState({count: this.state.count -1}), 200)});
  }

  updateBuzzer = () => {
    clearInterval(this.state.timer)
    this.setState({count: 10, timer: window.setInterval(() => this.setState({count: this.state.count -1}), 200)});
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


//if player 1 times out, go to game phase 3 (add logic)
  componentWillUpdate() {
    if (this.state.count === 0) {
      this.setState({
        showAnswer: true,
        gameState: 5
      }, this.showAnswerTimeOut)

//previous working code:
      // this.setState({
      //   gameState: 1
      // }, this.props.nextQuestion)
      // this.updateBuzzer();
      // this.cleanUpCount();
    }
  }

  componentDidUpdate() {
    if (this.state.gameState === 4) {
      this.setState({
        showAnswer: true,
        gameState: 5
      }, this.showAnswerTimeOut)
    }
  }

  handleBuzzIn = (event) => {
    if (this.state.gameState === 1) {
      if (event.code === "ShiftLeft") {
        this.updateBuzzer();
        this.setState({
          answeringPlayer: true,
          gameState: 2,
        })
      } else if (event.code === "ShiftRight") {
        this.updateBuzzer();
        this.setState({
          answeringPlayer: false,
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
    if (this.props.currentRound !== nextProps.currentRound && nextProps.currentRound !== 1) {
      this.props.updateScore(this.state.player1RoundScore, this.state.player2RoundScore)
      this.setState({player1RoundScore: 0, player2RoundScore: 0})
    }
  }

  showAnswerTimeOut = () => {
    setTimeout(this.setUpNextQuestion, 3000)
  }

  calculatePositivePoints () {

    let points = 10 * this.props.currentRound + this.state.count;
    if (this.state.gameState === 3) {
      points = Math.floor(points * (3/4));
    }
    console.log(points)
    if (this.state.answeringPlayer === true) {

      this.setState({player1RoundScore: this.state.player1RoundScore + points})
    } else if (this.state.answeringPlayer === false) {
      this.setState({player2RoundScore: this.state.player2RoundScore + points})
    }
  }

  calculateNegativePoints () {
    let points = 10 * this.props.currentRound;
    if (this.state.answeringPlayer === true) {

      this.setState({player1RoundScore: this.state.player1RoundScore - points})
    } else if (this.state.answeringPlayer === false) {
      this.setState({player2RoundScore: this.state.player2RoundScore - points})
    }
  }

  guess = (event) => {

    if (event.target.name === "correct") {
      alert("right!")
      this.calculatePositivePoints();
      this.setUpNextQuestion();
    }

    if (event.target.name === "incorrect"){
      alert("wrong!")
      event.target.disabled = true
      if (this.state.gameState === 2) {
        this.setState({gameState: 3, answeringPlayer: !this.state.answeringPlayer}, this.updateBuzzer)
      } else if (this.state.gameState === 3) {
        this.setState({gameState: 4, answeringPlayer: null})
      }
      this.calculateNegativePoints();
    }

    // if (this.state.gameState === 2) {
    //   this.setState({gameState: 3, answeringPlayer: !this.state.answeringPlayer}, this.updateBuzzer)
    // } else if (this.state.gameState === 3) {
    //   this.setState({gameState: 1, answeringPlayer: null}, this.props.nextQuestion)
    //   this.updateBuzzer()
    // }

      //slops
    }


    setUpNextQuestion = () => {
      this.setState({gameState: 1, answeringPlayer: null, showAnswer: false}, this.props.nextQuestion)
      this.updateBuzzer()
    }





  displayCurrentPlayer = () => {
    if (this.state.answeringPlayer === null) {
      return "Buzz in!"
    } else if (this.state.answeringPlayer === true) {
      return "Player 1's Turn"
    } else if (this.state.answeringPlayer === false) {
      return "Player 2's Turn"
    }
  }

  getTotalScores = () => {
    let player1Score = ''
    let player2Score = ''
    if (this.props.player1RoundsArray.length !== 0) {
      player1Score = this.props.player1RoundsArray.reduce(function (total, num) {
          return total + num;
          })
    } else {
      player1Score = ''
    }


    if (this.props.player2RoundsArray.length !== 0) {
      player2Score = this.props.player2RoundsArray.reduce(function getSum(total, num) {
      return total + num;})
    } else {
      player2Score = ''
    }
    // if (player1Score === NaN || player1Score === undefined ) {
    //   let player1Score = ''
    // }
    // if (player2Score === NaN | player1Score === undefined) {
    //   let player2Score = ''
    // }

    return `Player 1 Total Score:${player1Score}| Player 2 Total Score: ${player2Score}`
  }

  // displays current player, maps over all of the randomized answer buttons and once clicked disables them
    gameOn = () => {
      return (
        <div>
          <h2>{this.state.count} second left</h2>
          <h2 color="red">{this.displayCurrentPlayer()}</h2>
          <h3>{this.props.question}</h3>
          {this.state.shuffled.map(answer => <button key={answer} disabled={this.state.gameState === 1 ? true : false} onClick={this.guess} key={answer.id} name={answer === this.props.correctAnswer ? "correct" : "incorrect"} >{answer}</button>)}
      </div>
      )
    }


   showAnswer = () => {
    return (
      <div>
        <h2>The correct answer was: {this.props.correctAnswer}</h2>
      </div>
    )
  }

  render(){
    return (
      <div>
        <h1>Question Time!</h1>
        <h3>Player 1 Current Round Score: {this.state.player1RoundScore} | Player 2 Current Round Score: {this.state.player2RoundScore} </h3>
        <h3>{this.getTotalScores()}</h3>
        {this.state.showAnswer ? this.showAnswer() : this.gameOn()}
      </div>
    )
  }
}

export default QuestionContent;
