import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import {Menu, Container, Button, Header, Icon, Dropdown, Segment} from 'semantic-ui-react';


const GameOver = (props) => {

  function bestCategory(array){
    let highScore = Math.max(...array)
    let myIndex = array.findIndex(e => e === highScore)
    return props.location.state[`category${myIndex + 1}`]

  }

  function player1TotalScore() {
    let player1TotalScore = props.location.state.player1RoundsArray.reduce(function (total, num) {
        return total + num})
    return `Player 1 Total Score: ${player1TotalScore}`
  }

  function player2TotalScore() {
    let player2TotalScore = props.location.state.player2RoundsArray.reduce(function (total, num) {
        return total + num})
    return `Player 2 Total Score: ${player2TotalScore}`
  }



  console.log(props)
  return (
    <div>
      <Container>
        <Menu  inverted pointing secondary size='large'>
          <Menu.Item as={Link} to="" active>Home</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Add a Question</Menu.Item>
          <Menu.Item as='a'>Api</Menu.Item>
          <Menu.Item position='right'>
            <Button as={Link} to="new" inverted className={"white-link"}>Add User</Button>
            <Button as={Link} to="edit" inverted style={{ marginLeft: '0.5em' }}>Edit User</Button>
          </Menu.Item>
        </Menu>
      </Container>
      <video id="bg-video" autoplay="true" loop="loop" preload="metadata" muted="muted">
        <source src="https://static.videezy.com/system/resources/previews/000/005/614/original/Bokeh_Pan.mp4" />
      </video>
      <Container text textAlign='center'>
        <Header
          as='h1'
          content='Game Over'
          inverted
          style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
        />
        <Header
          as='h2'
          content={player1TotalScore()} inverted style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        />
        <Header
          as='h2'
          content={player2TotalScore()} inverted style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        />
        <Header
          as='h2'
          content={`Player 1 Best Category: ${bestCategory(props.location.state.player1RoundsArray)}`} inverted style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        />
        <Header
          as='h2'
          content={`Player 2 Best Category: ${bestCategory(props.location.state.player2RoundsArray)}`} inverted style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        />

    <Button primary size='huge' as={Link} to="gametime">
        Play Again?
        <Icon name='right arrow' />
      </Button>
      <Button secondary size='huge' as={Link} to="">
        Main Menu
        <Icon name='home' style={{marginLeft: "0.5em"}}/>
      </Button>
    </Container>
    </div>
  )
}

export default GameOver;


// <div>
//     <h1>Game over!</h1>
//     <h2>Player 1's Total Score: {props.location.state.player1RoundsArray.reduce(function (total, num) {
//         return total + num;
//         })
//     }</h2> <h2>Player 1's best Category: {bestCategory(props.location.state.player1RoundsArray)}</h2>
//   <h2>Player 2's Total Score:{props.location.state.player2RoundsArray.reduce(function (total, num) {
//         return total + num;
//         })
//     }</h2>
//   <h2>Player 2's best Category: {bestCategory(props.location.state.player2RoundsArray)}</h2>
//   <Link to="/"><button>Play Again?</button></Link>
//     </div>
