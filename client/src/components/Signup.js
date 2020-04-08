import React from 'react'
import { registerUser, loginUser } from '../services/api-helper'

class SignUp extends React.Component {
  constructor() {
    super()

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value,
      // isError: false,
      // errorMsg: ''
    })

  onSignUp = event => {
    event.preventDefault()

    const { history, setUser } = this.props

    registerUser(this.state)
      .then(() => loginUser(this.state))
      .then(res => setUser(res.user)) //set the user in App.js
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({
          username: '',
          email: '',
          password: ''
        })
      })
  }

  // renderError = () => {
  //   const toggleForm = this.state.isError ? 'danger' : ''
  //   if (this.state.isError) {
  //     return (
  //       <button type="submit" className={toggleForm}>
  //         {this.state.errorMsg}
  //       </button>
  //     )
  //   } else {
  //     return <button type="submit">Sign In</button>
  //   }
  // }

  render() {
    const { email, username, password } = this.state

    return (
        <div className="form-container">
          <h3>Sign Up</h3>
          <form onSubmit={this.onSignUp}>
            <label>Username</label>
            <input
              required
              type="text"
              name="username"
              value={username}
              placeholder="enter username"
              onChange={this.handleChange}
            />
            <label>Email address</label>
            <input
              required
              type="email"
              name="email"
              value={email}
              placeholder="enter email"
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              required
              name="password"
              value={password}
              type="password"
              placeholder="password"
              onChange={this.handleChange}
            />
            <button type="submit">Sign In</button>
            {/* {this.renderError()} */}
          </form>
        </div>
    )
  }
}

export default SignUp