import React from 'react'
import { loginUser } from '../services/api-helper'
// import { Link } from '@material-ui/core'


class SignIn extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    }
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: ''
    })

  onSignIn = async (event) => {
    event.preventDefault()

    const { setUser, history } = this.props
    try
    {
      const {username,password} = this.state
      const user = await loginUser({ username,password })
    await setUser(user)  //set the user in App.js
    await history.push('/')
    }
      catch(error){
        console.error(error)
      }
  }

  renderError = () => {
    const toggleForm = this.state.isError ? 'danger' : ''
    if (this.state.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {this.state.errorMsg}
        </button>
      )
    } else {
      return <button type="submit">Sign In</button>
    }
  }

  render() {
    const { username, password } = this.state

    return (
      <div className="signup">
        <h2>Welcome</h2>
        <form className="signupform" onSubmit={this.onSignIn}>
          <label>Username</label>
          <div>
            <input
              required
              type="text"
              name="username"
              value={username}
              placeholder="enter username"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <br />
          <label>Password</label>
          <div>
            <input
              required
              name="password"
              value={password}
              type="password"
              placeholder="password"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <button type="submit">Sign In</button>
          {/* {this.renderError()} */}
        </form>
      </div>
    )
  }
}

export default SignIn