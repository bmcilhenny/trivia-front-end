import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

class StartGame extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 5,
      displayCount: false,
      timer: null
    }
  }

  delayStartGame = () => {
    this.setState({
      displayCount: true,
      timer: window.setInterval(() => this.setState({counter: this.state.counter -1}), 1000)});
    setTimeout(function () {
       window.location.href = "/";
    }, 5000);
  }

  render() {
    console.log(this.state.counter)
    let counter = this.state.counter
    return (
      <div>
        <h1>Welcome</h1>
        <button onClick={this.delayStartGame}>Start a Game</button>
        <h1>{this.state.displayCount ? counter : ''}</h1>
      </div>
    )
  }


}


export default StartGame;
