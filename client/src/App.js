import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout'

import { readAllResources, readAllCategories, verifyUser, readOneResource, getAllResourcesByUserId } from './services/api-helper';
import ResourcesIndex from './components/ResourcesIndex';
import CategoriesIndex from './components/CategoriesIndex';
import Home from './components/Home'
import SignIn from './components/SignIn';
import SignUp from './components/Signup';
import MyResources from './components/MyResources';



class App extends React.Component {
  state = {
    user: null,
    resources: [],
    categories: [],
    selected: '',
    userResources: ''

  }

  async componentDidMount() {
    this.getResources();
    this.getCategories();
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ user: currentUser })
    }
  }

  // ====================================
  // ============= Resources ================
  // ====================================

  getResources = async () => {
    const resources = await readAllResources();
    const sortedResources = resources.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    this.setState({ resources: sortedResources, selected: '' });
  }

  getUsersResources = async (id) => {
    const resources = await getAllResourcesByUserId(id);
    const sortedResources = resources.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    this.setState({ userResources: sortedResources })
    this.props.history.push(`/users/${this.state.user.id}/resources`)
  }

  getOneResource = async (id) => {
    const resource = await readOneResource(id);
    this.setState({ resource });
  }

  setResource = (id) => {
    this.setState({
      selected: id
    })
    this.props.history.push(`/resources/${id}`)
  }

  deleteResource = async (id) => {
    await this.getResources()
    this.componentDidMount()
    this.props.history.push('/')
  }
  // ====================================
  // ============= Categories ==============
  // ====================================

  getCategories = async () => {
    const categories = await readAllCategories();
    this.setState({ categories });
  }

  setUser = user => this.setState({ user });
  clearUser = () => { this.setState({ user: null }); localStorage.setItem('authToken', '') };
  // ====================================
  // ============= Render ===============
  // ====================================

  render() {
    return (
      <Layout
        clearUser={this.clearUser}
        user={this.state.user}>
        <div>
          <Route exact path='/' render={(props) => (
            <Home
              {...props}
              clearUser={this.clearUser}
              deleteResource={this.deleteResource}
              setResource={this.setResource}
              getResources={this.getResources}
              user={this.state.user}
              resources={this.state.resources} />)} />
          <Route path='/auth/signup' render={(props) => (
            <SignUp {...props}
              user={this.state.user}
              setUser={this.setUser}
              getUsersResources={this.getUsersResources} />)
          } />
          <Route path='/auth/login' render={(props) => (
            <SignIn {...props}
              user={this.state.user}
              setUser={this.setUser}
              getUsersResources={this.getUsersResources} />)
          } />
          <Route path='/resources' render={(props) => (
            <ResourcesIndex
              {...props}
              setResource={this.setResource}
              selected={this.state.selected}
              getOneResource={this.getOneResource}
              getResources={this.getResources}
              getUsersResources={this.getUsersResources}
              user={this.state.user}
              resources={this.state.resources}
              deleteResource={this.state.deleteResource}
            />
          )}
          />
          <Route path='/users/:userId/resources' render={(props) =>
            (<MyResources
              {...props}
              setResource={this.setResource}
              selected={this.state.selected}
              getOneResource={this.getOneResource}
              getUsersResources={this.getUsersResources}
              getResources={this.getResources}
              user={this.state.user}
              userResources={this.state.userResources}
              resources={this.state.resources}
              deleteResource={this.state.deleteResource}
            />)
          }

          />
          <Route path='/categories' render={(props) => (
            <CategoriesIndex
              {...props}
              user={this.state.user}
              categories={this.state.categories}
            />
          )}
          />
        </div>
      </Layout>
    );
  }
}

export default withRouter(App);