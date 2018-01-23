import React from 'react'
import {Link} from 'react-router-dom'


class EditUser extends React.Component {

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
    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(myBody)
    }).then(resp => resp.json()).
    then(json => console.log(json))
  } else {
    alert("fill it out")
  }
  }


  render() {
    return (<div>
      <h1>Create a New User</h1>
      <form onSubmit={this.createUser}>
        <label>Name</label>
        <input type="text" id="name" value={this.state.name} onChange={this.handleChange} />
        <label>Bio</label>
        <input type="text" id="bio" value={this.state.bio} onChange={this.handleChange}/>
        <label>Image Link</label>
        <input type="text" id="image" value={this.state.image} onChange={this.handleChange}/>
        <button type="submit" >Submit</button>
      </form>
      <Link to="/startgame">
        <button>Back to Start Game Page</button>
      </Link>
    </div>)
  }
}

export default EditUser
