import React from 'react'
import {Menu, Container, Button, Header, Icon, Dropdown, Segment, Form} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { API_ROOT } from '../constants'



class NewUser extends React.Component {

  constructor(){
    super()
    this.state = {
      name: "",
      bio: "",
      image: ""
    }
  }

  handleChange = event => {
    let newVal = event.target.id
    this.setState({[newVal]: event.target.value})
  }

  createUser = event => {
    event.preventDefault()
    if (this.state.name !== "" && this.state.bio !== "") {
    let myBody = {name: this.state.name, bio: this.state.bio, image: this.state.image};
    fetch(`${API_ROOT}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(myBody)
    }).then(resp => resp.json()).
    then(json => {console.log(json); this.props.routerProps.history.push("/")})
    } else {
    alert("fill it out")
    }
  }


  render() {
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
          <div>
            <Header
              as='h1'
              content='Create a New User'
              inverted
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
            />
            <Form onSubmit={this.createUser}>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Name' placeholder='Your name' id="name" value={this.state.name} onChange={this.handleChange} />
                <Form.Input fluid label='Bio' placeholder='Bio' id="bio" value={this.state.bio} onChange={this.handleChange}/>
                <Form.Input fluid label='Image Link' placeholder='Image Link' id="image" value={this.state.image} onChange={this.handleChange}/>
              </Form.Group>
              <Button primary size='huge' type="submit">
                Submit
                <Icon name='right arrow' />
              </Button>
              <Button secondary size='huge' as={Link} to="">
                Main Menu
                <Icon name='home' style={{marginLeft: "0.5em"}}/>
              </Button>
            </Form>
          </div>
        </Container>
      </div>
      )
  }
}

export default NewUser;


// <div>
//   <h1>Create a New User</h1>
//   <form onSubmit={this.createUser}>
//     <label>Name</label>
//     <input type="text" id="name" value={this.state.name} onChange={this.handleChange} />
//     <label>Bio</label>
//     <input type="text" id="bio" value={this.state.bio} onChange={this.handleChange}/>
//     <label>Image Link</label>
//     <input type="text" id="image" value={this.state.image} onChange={this.handleChange}/>
//     <button type="submit" >Submit</button>
//   </form>
//   <Link to="/">
//     <button >Back to Start Game Page</button>
//   </Link>
// </div>
