import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const GameOver = (props) => {
  console.log(props)
  return (<div>
    <h1>Game over!</h1>
    <h2>Player 1's Total Score: {props.location.state.player1RoundsArray.reduce(function (total, num) {
        return total + num;
        })
    }</h2>
  <h2>Player 2's Total Score:{props.location.state.player2RoundsArray.reduce(function (total, num) {
        return total + num;
        })
    }</h2>
  <Link to="/gametime"><button>Play Again?</button></Link>
  <Link to="/startgame"><button>Main Menu</button></Link>
    </div>
  )
}



export default GameOver
