import React from 'react';
import {Menu, Container, Button, Header, Icon, Dropdown, Segment, Form} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { API_ROOT } from '../constants'

class EditUser extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      name: "",
      bio: "",
      image: "",
      players: [],
      selectedUser: null
    }
  }

  componentDidMount() {
    this.grabUsers();
  }

  grabUsers = () => {
    fetch(`${API_ROOT}/users`)
    .then(resp => resp.json())
    .then(json => this.setState({players: json,
      name: json[0].name,
      bio: json[0].bio,
      image: json[0].image,
      selectedUser: json[0].id})
    )
  }

  handleChange = event => {
    let newVal = event.target.id
    this.setState({[newVal]: event.target.value})
  }

  handleSelect = (event, data) => {
    let user = this.state.players.find(player => player.id === parseInt(data.value))
    this.setState({
      selectedUser: user.id,
      name: user.name,
      bio: user.bio,
      image: user.image
    })
  }

  editUser = event => {
    event.preventDefault();
    let myBody = {name: this.state.name, bio: this.state.bio, image: this.state.image};
    fetch(`${API_ROOT}/users/${this.state.selectedUser}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify(myBody)
    })
      .then(resp => resp.json())
      .then(json => {console.log(json); this.props.routerProps.history.push("/")})
  }

  deleteUser = event => {
    event.preventDefault();
    fetch(`${API_ROOT}/users/${this.state.selectedUser}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      }
    }, () => this.props.routerProps.history.push("/"))
  }

  createOptionsForForm = () => {
    let newArr = []
    this.state.players.forEach(el => newArr.push(Object.assign({text: el.name, key: el.id, value: el.id})))
    return newArr;
  }


  render() {
    console.log("Inside the render, this is is the current state selected user", this.state.selectedUser)
    return (
      <div>
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
              content='Edit an Existing User'
              inverted
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
            />
            <Form onSubmit={this.editUser}>
              <Form.Group widths='equal'>
                <Form.Select fluid label='Select Player' id="selectedUser" options={this.createOptionsForForm()} placeholder='Player' selection
                value={this.state.selectedUser} onChange={this.handleSelect}/>
                <Form.Input fluid label='Name' placeholder='Your name' id="name" value={this.state.name} onChange={this.handleChange} />
                <Form.Input fluid label='Bio' placeholder='Bio' id="bio" value={this.state.bio} onChange={this.handleChange}/>
                <Form.Input fluid label='Image Link' placeholder='Image Link' id="image" value={this.state.image} onChange={this.handleChange}/>

            </Form.Group>
              <Button primary size='huge' type="submit">
                Confirm
                <Icon name='right arrow' />
              </Button>
              <Button negative size='huge' onClick={this.deleteUser}>
                Delete
                <Icon name='home' style={{marginLeft: "0.5em"}}/>
              </Button>
            </Form>
          </div>
        </Container>
      </div>


    )
  }
}

export default EditUser;

// <div>
//   <h1>Edit a User</h1>
//   <form onSubmit={this.editUser}>
//     <select value={this.state.selectedUser} onChange={this.handleSelect} id="selectedUser">
//       {this.state.players.map(player => <option value={player.id} key={player.id}>{player.name}</option>)}
//     </select>
//     <input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
//     <input type="text" id="bio" value={this.state.bio} onChange={this.handleChange}/>
//     <input type="text" id="image" value={this.state.image} onChange={this.handleChange}/>
//     <button type="submit" >Confirm</button>
//   </form>
//   <button onClick={this.deleteUser}>Delete</button>
// </div>
