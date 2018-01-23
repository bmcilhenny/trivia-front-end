import React from 'react'


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
    fetch('http://localhost:3000/api/v1/users')
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

  handleSelect = event => {
    let newVal = event.target.id;
    let user = this.state.players.find(player => player.id === parseInt(event.target.value))
    console.log(user)
    this.setState({
      [newVal]: event.target.value,
      name: user.name,
      bio: user.bio,
      image: user.image
    })
  }

  editUser = event => {
    event.preventDefault();
    let myBody = {name: this.state.name, bio: this.state.bio, image: this.state.image};
    fetch(`http://localhost:3000/api/v1/users/${this.state.selectedUser}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify(myBody)
    })
      .then(resp => resp.json())
      .then(json => {console.log(json); this.props.routerProps.history.push("/startgame")})
  }

  deleteUser = event => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/v1/users/${this.state.selectedUser}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      }
    }, () => this.props.routerProps.history.push("/startgame"))
  }


  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Edit a User</h1>
        <form onSubmit={this.editUser}>
          <select value={this.state.selectedUser} onChange={this.handleSelect} id="selectedUser">
            {this.state.players.map(player => <option value={player.id} key={player.id}>{player.name}</option>)}
          </select>
          <input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
          <input type="text" id="bio" value={this.state.bio} onChange={this.handleChange}/>
          <input type="text" id="image" value={this.state.image} onChange={this.handleChange}/>
          <button type="submit" >Confirm</button>
        </form>
        <button onClick={this.deleteUser}>Delete</button>
      </div>
    )
  }
}

export default EditUser
