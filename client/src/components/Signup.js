import React from 'react'
import { registerUser, loginUser } from '../services/api-helper'
import { Route, Link } from 'react-router-dom'
import SignIn from './SignIn'


class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      isError: false,
      errorMsg:''
    }
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value,
    })

  onSignUp = async (event) => {
    event.preventDefault()

    const { setUser, getUsersResources, history } = this.props
    try
    {
      await registerUser(this.state)
      const user = await loginUser(this.state)
      await setUser(user)  //set the user in App.js
      await history.push('/')
    }
      catch(error){
      console.error(error)      
      this.setState(
        {
          isError: true,
          errorMsg: `${error.response.status}`
        })
      }
  }


  render() {
    const { email, username, password } = this.state

    return (
      <div className="signup">
        <h2>Welcome</h2>
        <form className="signupform" onSubmit={this.onSignUp}>
          <label>username</label>
          <div>
            <input className="login-input"
              required
              type="text"
              name="username"
              value={username}
              placeholder="enter username"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <label>email address</label>
          <div>
            <input className="login-input"
              required
              type="email"
              name="email"
              value={email}
              placeholder="enter email"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <label>password</label>
          <div>
            <input className="login-input"
              required
              name="password"
              value={password}
              type="password"
              placeholder="password"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <button type="submit">Sign Up</button>
          <h4>Already registered?  
          <Route path="/auth/login" render={(props) => <SignIn {...props}/>}>
              <Link to="/auth/login"> Sign in</Link>
            </Route>
            </h4>
        </form>
      </div>
    )
  }
}

export default SignUp