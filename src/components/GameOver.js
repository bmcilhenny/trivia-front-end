import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const GameOver = (props) => {

  function bestCategory(array){
    let highScore = Math.max(...array)
    let myIndex = array.findIndex(e => e === highScore)
    return props.location.state[`category${myIndex + 1}`]

  }

  console.log(props)
  return (<div>
    <h1>Game over!</h1>
    <h2>Player 1's Total Score: {props.location.state.player1RoundsArray.reduce(function (total, num) {
        return total + num;
        })
    }</h2> <h2>Player 1's best Category: {bestCategory(props.location.state.player1RoundsArray)}</h2>
  <h2>Player 2's Total Score:{props.location.state.player2RoundsArray.reduce(function (total, num) {
        return total + num;
        })
    }</h2>
  <h2>Player 2's best Category: {bestCategory(props.location.state.player2RoundsArray)}</h2>
  <Link to="/startgame"><button>Play Again?</button></Link>
    </div>
  )
}


//pull names
//pull games score
// pull best category for each player.

//show leaderboard on end game.  User, total score, best category


export default GameOver
