import React from 'react';
import {Menu, Container, Button, Header} from 'semantic-ui-react';

const Jumbo = (props) => {
  return (
    <div class="jumbotron">
      <video id="bg-video" autoplay="true" loop="loop" preload="metadata" muted="muted">
        <source src="https://10-lvl3-pdl.vimeocdn.com/01/4251/4/121257225/342565508.mp4?expires=1516812163&token=06aff2b8a111ae4b070f5" />
      </video>
      <div class="center text-center">
        <Header as='h1' inverted className="main-header">Welcome</Header>
        <p><a class="btn center btn-primary btn-lg" id="botjumbo" href="#" role="button" onClick={props.handleClick}>Play a Game</a></p>
      </div>
    </div>

  )
}

export default Jumbo;
