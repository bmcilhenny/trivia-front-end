import React from 'react';
import {Menu, Container, Button, Header, Icon, Dropdown, Segment} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import LeaderBoard from './components/LeaderBoard';
// import Parser from 'html-react-parser';
// import Directions from './components/Directions';

const Jumbo = (props) => {
  return (
    <div >
      <Container>
        <Menu  inverted pointing secondary size='large'>
          <Menu.Item as={Link} to="" active>Home</Menu.Item>
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
          content='Welcome to Trivia.tv'
          inverted
          style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
        />
        <Header
          as='h2'
          content={props.displayCount ? "To buzz in click on the left(Player 1) or right(Player 2) shift button on the keyboard" : "Win absolutely nothing but hey, that's cool.."}
          inverted
          style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        />
        <Button primary size='huge' onClick={props.handleClick} disabled={props.displayCount ? true : false}>
          Start a Game
          <Icon name='right arrow' />
        </Button>
        <Segment style={{ backgroundColor:'transparent', border: 'none', border: 0}}>
          <h1 style={{color: "white"}}>{props.displayCount ? props.counter : ''}</h1>
            <span style={{color: "white", "font-size": "150%"}}>Choose your players</span><Dropdown basic style={{ marginLeft: '0.5em' }}
              onChange={props.onChange1}
              options={props.createOptionsForForm()}
              placeholder='Select Player 1'
              selection
              value={props.player1Select}
            />
          <Dropdown style={{ marginLeft: '0.5em'}}
              onChange={props.onChange2}
              options={props.createOptionsForForm()}
              placeholder='Select Player 2'
              selection
              value={props.player2Select}
            />
          </Segment>
          <LeaderBoard leaderboard={props.leaderboard} />
      </Container>
    </div>

  )
}

export default Jumbo;

// <div className="center text-center">
//   <Header as='h1' inverted className="main-header">Welcome to Trivia.tv</Header>
//   <p><a className="btn center btn-primary btn-lg" id="botjumbo" href="#" role="button" onClick={props.handleClick}>Play a Game</a></p>
// </div>
//
