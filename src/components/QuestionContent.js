import React from 'react';
import { Header, Icon, Image, Segment, Grid, Container } from 'semantic-ui-react';
import Sound from 'react-sound';


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
      correctAnswer: '',
      play: false
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
          play: "PLAYING"
        })
      } else if (event.code === "ShiftRight") {
        this.updateBuzzer();
        this.setState({
          answeringPlayer: false,
          gameState: 2,
          play: "PLAYING"
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

  getPlayer1Total = () => {
    let player1Score = '';
    if (this.props.player1RoundsArray.length !== 0) {
      player1Score = this.props.player1RoundsArray.reduce(function (total, num) {
          return total + num;
      })
    }
    return player1Score
  }

  getPlayer2Total = () => {
    let player2Score = '';
    if (this.props.player2RoundsArray.length !== 0) {
      player2Score = this.props.player2RoundsArray.reduce(function (total, num) {
          return total + num;
      })
    }
    return player2Score
  }

  // getTotalScores = () => {
  //   let player1Score = ''
  //   let player2Score = ''
  //   if (this.props.player1RoundsArray.length !== 0) {
  //     player1Score = this.props.player1RoundsArray.reduce(function (total, num) {
  //         return total + num;
  //         })
  //   } else {
  //     player1Score = ''
  //   }
  //
  //
  //   if (this.props.player2RoundsArray.length !== 0) {
  //     player2Score = this.props.player2RoundsArray.reduce(function getSum(total, num) {
  //     return total + num;})
  //   } else {
  //     player2Score = ''
  //   }
  //   return `Player 1 Total Score:${player1Score}| Player 2 Total Score: ${player2Score}`
  // }

  // displays current player, maps over all of the randomized answer buttons and once clicked disables them
    gameOn = () => {
      return (
        <Container text textAlign='center'>
          <Segment style={{height: 400, width: 650, background: "rgba(211, 211, 211, .9)"}}>
            <h2>{this.state.count} second left</h2>
            <h2 color="red">{this.displayCurrentPlayer()}</h2>
            <h3>{this.props.question}</h3>
            <br />
            {this.state.shuffled.map(answer => <button key={answer} className="blue big ui button" disabled={this.state.gameState === 1 ? true : false} onClick={this.guess} key={answer.id} name={answer === this.props.correctAnswer ? "correct" : "incorrect"} >{answer}</button>)}
          </Segment>
        </Container>
      )
    }


   showAnswer = () => {
    return (
      <Container text textAlign='center'>
        <Segment style={{height: 400, width: 650, background: "rgba(211, 211, 211, .9)"}}>
          <Container ><h2 style={{"line-height": "250px"}}>The correct answer was: {this.props.correctAnswer}</h2></Container>
        </Segment>
      </Container>
    )
  }

  render(){
    return (
      <div>
        <Segment text textAlign='center' style={{background: 0, border: 0}}>
          <Header
            as='h1'
            content="Question Time"
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '0.5em' }}
          ></Header>
          <Header
            as='h2'
            content=`Round ${this.props.currentRound}`
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '0.5em' }}
          ></Header>
          <Segment circular floated="left">Player 1 Current Round Score: {this.state.player1RoundScore}<p>Total: {this.getPlayer1Total()}</p></Segment>
          <Segment circular floated="right">Player 2 Current Round Score: {this.state.player2RoundScore}<p>Total: {this.getPlayer2Total()}</p></Segment>
        </Segment>
        {this.state.showAnswer ? this.showAnswer() : this.gameOn()}
        <Sound
        url="https://www.myinstants.com/media/sounds/times-up.mp3"
        playStatus={this.state.play}
        onFinishedPlaying={() => this.setState({play: false})}
        />
      </div>
    )
  }
}

export default QuestionContent;
