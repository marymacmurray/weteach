import React from 'react';
import { Route } from 'react-router';
import './App.css';

import { readAllResources, readAllCategories } from './services/api-helper';
import ResourcesIndex from './components/ResourcesIndex';
import CategoriesIndex from './components/CategoriesIndex';
import Signup from './components/Signup'


class App extends React.Component {
  state = {
    resources: [],
    categories: []
  }

  componentDidMount() {
    this.getResources();
    this.getCategories()
  }

  // ====================================
  // ============= Foods ================
  // ====================================

  getResources = async () => {
    const resources = await readAllResources();
    this.setState({ resources });
  }

  // ====================================
  // ============= Flavors ==============
  // ====================================

  getCategories = async () => {
    const categories = await readAllCategories();
    this.setState({ categories });
  }

  setUser = user => this.setState({ user });

  // ====================================
  // ============= Render ===============
  // ====================================

  render() {
    return (
      <div className="App">
        <h1>Main page text here</h1>
        <Route path='/auth/login' render={() => (
          <Signup setUser={this.setUser}/>
        )}/>
        <Route path='/resources' render={() => (
          <ResourcesIndex
            resources={this.state.resources}
          />
        )} />
        <Route path='/categories' render={() => (
          <CategoriesIndex
            categories={this.state.categories}
          />
        )} />
      </div>
    );
  }
}

export default App;