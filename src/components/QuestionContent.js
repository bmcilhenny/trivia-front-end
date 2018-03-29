import React from 'react';
import { Header, Icon, Image, Segment, Grid, Container, Reveal, Transition } from 'semantic-ui-react';
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
      player1Active: false,
      player2Active: false,
      player1RoundScore: 0,
      player2RoundScore: 0,
      showAnswer: false,
      correctAnswer: '',
      play: false,
      player1Active: false,
      player2Active: false,
      visible: false
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
  
  showThumbsUp() {
    
  }

  handleBuzzIn = (event) => {
    if (this.state.gameState === 1) {
      if (event.code === "ShiftLeft") {
        this.updateBuzzer();
        this.setState({
          answeringPlayer: true,
          gameState: 2,
          play: "PLAYING",
          player1Active: true,
          player2Active: false
        })
      } else if (event.code === "ShiftRight") {
        this.updateBuzzer();
        this.setState({
          answeringPlayer: false,
          gameState: 2,
          play: "PLAYING",
          player1Active: false,
          player2Active: true
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
      // alert("right!")
      this.calculatePositivePoints();
      this.setUpNextQuestion();
      this.setState({player1Active: false, player2Active: false, visible: true}, () => setTimeout(() => this.setState({visible: false}), 1000))
    }

    if (event.target.name === "incorrect"){
      // alert("wrong!")
      event.target.disabled = true;
      // event.target.color = 'red';
      if (this.state.gameState === 2) {
        this.setState({gameState: 3, answeringPlayer: !this.state.answeringPlayer}, this.updateBuzzer)
        if (this.state.player1Active) {
          this.setState({player1Active: false, player2Active: true})
        } else {
          this.setState({player1Active: true, player2Active: false})
        }
      } else if (this.state.gameState === 3) {
        this.setState({gameState: 4, answeringPlayer: null, player1Active: false, player2Active: false})
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
      this.setState({gameState: 1, answeringPlayer: null, showAnswer: false, player1Active: false, player2Active: false}, this.props.nextQuestion)
      this.updateBuzzer()
    }





  displayCurrentPlayer = () => {
    if (this.state.answeringPlayer === null) {
      return "Buzz in!"
    } else if (this.state.answeringPlayer === true) {
      return `${this.props.user1Obj.name}'s turn`
    } else if (this.state.answeringPlayer === false) {
      return `${this.props.user2Obj.name}'s turn`
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

  // displays current player, maps over all of the randomized answer buttons and once clicked disables them
    gameOn = () => {

      let answers = this.state.shuffled.map(answer => <button key={answer} className="blue big ui button" disabled={this.state.gameState === 1 ? true : false} onClick={this.guess} key={answer.id} name={answer === this.props.correctAnswer ? "correct" : "incorrect"} >{answer}</button>)
      return (
        <Container text textAlign='center'>
          <Segment style={{height: 400, width: 650, background: "rgba(211, 211, 211, .9)"}}>
          
            <h3>{this.state.count} second(s) left</h3>
            <h3 color="red">{this.displayCurrentPlayer()}</h3>
            <h2>{this.props.question}</h2>
            <br />
            <Grid columns="2">
              <Grid.Row>
                <Grid.Column>
                  {answers[0]}
                </Grid.Column>
                <Grid.Column>
                  {answers[1]}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {answers[2]}
                </Grid.Column>
                <Grid.Column>
                  {answers[3]}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
            <Transition.Group animation="fly up" duration="900">
              {this.state.visible && <Icon name="thumbs up" size="huge" style={{color: "white", position: "fixed", top: "50%", left: "50%", marginTop: "-50px", marginLeft: "-50px"}}/>}
            </Transition.Group>
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
            content={`Round ${this.props.currentRound}`}
            inverted
            style={{ fontSize: '3em', fontWeight: 'normal', marginBottom: 0, marginTop: '0.2em' }}
          ></Header>

          <Segment circular floated="left" active={this.state.player1Active}>
            <Reveal animated='rotate left' floated="left" active={this.state.player1Active}>
              <Reveal.Content visible>
                <Image circular size='small' src={this.props.user1Obj.image} />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Image circular size='small' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Green_Light_Icon.svg/2000px-Green_Light_Icon.svg.png' />
              </Reveal.Content>
            </Reveal>
          </Segment>
          <Segment circular floated="right" active={this.state.player2Active}>
            <Reveal animated='rotate' floated="right" active={this.state.player2Active}>
              <Reveal.Content visible>
                <Image circular size='small' src={this.props.user2Obj.image} />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Image circular size='small' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Green_Light_Icon.svg/2000px-Green_Light_Icon.svg.png' />
              </Reveal.Content>
            </Reveal>
          </Segment>
        </Segment>

        {this.state.showAnswer ? this.showAnswer() : this.gameOn()}
        <Sound
        url="https://www.myinstants.com/media/sounds/times-up.mp3"
        playStatus={this.state.play}
        onFinishedPlaying={() => this.setState({play: false})}
        />
        <Segment floated="left" style={{padding: '20px'}}>
          Current Round Score: {this.state.player1RoundScore}
        </Segment>

        <Segment floated="right" style={{padding: '20px'}}>
          Current Round Score: {this.state.player2RoundScore}
        </Segment>
        
      </div>
    )
  }
}

export default QuestionContent;
// {this.state.shuffled.map(answer => <button key={answer} className="blue big ui button" disabled={this.state.gameState === 1 ? true : false} onClick={this.guess} key={answer.id} name={answer === this.props.correctAnswer ? "correct" : "incorrect"} >{answer}</button>)}

// <Segment circular floated="left">Player 1 Current Round Score: {this.state.player1RoundScore}<p>Total: {this.getPlayer1Total()}</p></Segment>
// <Segment circular floated="right">Player 2 Current Round Score: {this.state.player2RoundScore}<p>Total: {this.getPlayer2Total()}</p></Segment>


// <Segment style={{background: 0, border: 0}}>
  // <Segment circular floated="left">
  //   Current Round Score: {this.state.player1RoundScore}
  // </Segment>
//
  // <Segment circular floated="right">
  //   Current Round Score: {this.state.player2RoundScore}
  // </Segment>
// </Segment>
