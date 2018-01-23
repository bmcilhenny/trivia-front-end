import React from 'react'


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


  render() {
    return (<div>
      <h1>Edit a User</h1>
      <form>
        <input type="text" id="name" value={this.state.name} />
        <input type="text" id="bio" value={this.state.bio} />
        <input type="text" id="image" value={this.state.image} />
        <button type="submit" />
      </form>
    </div>)
  }
}

export default EditUser
