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
// import EnsureLoggedInContainer from './components/EnsureLoggedInContainer'


class App extends React.Component {
  state = {
    user: null,
    resources: [],
    categories: [],

  }

  async componentDidMount() {
    this.getResources();
    this.getCategories();
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
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
      <Layout user={this.state.currentUser}>
        <div>
          <Route exact path='/' render={(props) => (
            <Home
              {...props}
              user={this.state.currentUser}
              resources={this.state.resources} />)}/>
          <Route path='/auth/login' render={(props) => (
            !this.state.currentUser ? 
              (<Signup {...props} setUser={this.setUser} />) :
            (<SignIn {...props} setUser={this.setUser} />)
          )} />
          <Route exact path='/resources/:id' render={(props) => (
            <EditResource
              {...props}
              getOneResource={this.getOneResource}
              getResources={this.getResources}
              user={this.state.currentUser}
            />
          )}/>
          <Route exact path='/resources' render={(props) => (
            <ResourcesIndex
              {...props}
              getResources={this.getResources}
              user={this.state.currentUser}
              resources={this.state.resources}
            />
          )}
          />
          <Route path='/categories' render={(props) => (
            <CategoriesIndex
              {...props}
              user={this.state.currentUser}
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