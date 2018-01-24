import React from 'react';
import {Menu, Container, Button, Header, Icon, Dropdown, Segment} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const Jumbo = (props) => {
  return (
    <div >
      <Container>
        <Menu  inverted pointing secondary size='large'>
          <Menu.Item as={Link} to="startgame" active>Home</Menu.Item>
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
        <source src="https://10-lvl3-pdl.vimeocdn.com/01/4251/4/121257225/342565508.mp4?expires=1516812163&token=06aff2b8a111ae4b070f5" />
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
          content="Win absolutely nothing but hey, that's cool.."
          inverted
          style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        />
        <Button primary size='huge' onClick={props.handleClick}>
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
