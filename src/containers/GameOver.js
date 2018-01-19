import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const GameOver = (props) => {
  console.log(props)
  return (<div>
    <h1>gameover!</h1>
    <h2>Player 1's Total Score: {props.location.state.player1RoundsArray.reduce(function (total, num) {
        return total + num;
        })
    }</h2>
    <h2>Player 1's Total Score:{props.location.state.player2RoundsArray.reduce(function (total, num) {
        return total + num;
        })
    }</h2>
    <Link to="/"><button>Play Again?</button></Link>
    </div>)
}



export default GameOver
