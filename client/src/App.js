import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout'

import { readAllResources, readAllCategories, verifyUser, readOneResource } from './services/api-helper';
import ResourcesIndex from './components/ResourcesIndex';
import CategoriesIndex from './components/CategoriesIndex';
import Signup from './components/Signup'
import Home from './components/Home'
import SignIn from './components/SignIn';
import EditResource from './components/EditResource'
import SignUp from './components/Signup';
// import EnsureLoggedInContainer from './components/EnsureLoggedInContainer'


class App extends React.Component {
  state = {
    user: null,
    resources: [],
    categories: [],
    selected: ''

  }

  async componentDidMount() {
    this.getResources();
    this.getCategories();
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ user:currentUser })
    }
  }

  // ====================================
  // ============= Resources ================
  // ====================================

  getResources = async () => {
    const resources = await readAllResources();
    this.setState({ resources });
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

  deleteResource = async () => {
    await this.getResources()
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
  clearUser = () => this.setState({ user: null });
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
              deleteResource={this.deleteResource}
              setResource={this.setResource}
              getResources={this.getResources}
              user={this.state.user}
              resources={this.state.resources} />)}/>
          <Route path='/auth/login' render={(props) => (
            !this.state.user && localStorage.getItem('authToken') ? 
              (<SignIn {...props} setUser={this.setUser} />) :
            (<SignUp {...props} setUser={this.setUser} />)
          )} />
          
          <Route path='/resources' render={(props) => (
            <ResourcesIndex
              {...props}
              setResource={this.setResource}
              selected={this.state.selected}
              getOneResource={this.getOneResource}
              getResources={this.getResources}
              user={this.state.user}
              resources={this.state.resources}
            />
          )}
          />
          <Route path='/categories' render={(props) => (
            <CategoriesIndex
              {...props}
              user={this.state.user}
              categories={this.state.categories}
            />
          )}
          />
          {/* <Route path='/categories/:category_id/resources/:id' component={AddCategorytoResource}/> */}
        </div>
      </Layout>
    );
  }
}

export default withRouter(App);