import { Component } from 'react'
import { removeToken } from '../services/api-helper'

class SignOut extends Component {
  async componentDidMount() {
    const { history, clearUser } = this.props
    try {
      removeToken()
      await clearUser
      await history.push('/')
    }catch(error){
      console.error(error)
    }
 }
  render() {
    return ''
  }
}

export default SignOut