import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import CreateResource from './CreateResource'
import { createResource, updateResource } from '../services/api-helper';
import EditResource from './EditResource'

class ResourcesIndex extends React.Component {
  state = {
    formData: {
      name: '',
      link: '',
      description: ''
    }
  }

  componentDidMount = () => {
    if (this.props.selected) {
      this.setEdit(this.props.selected)
    }
  }

  setEdit = async(id) => {
    const allResources = this.props.resources
    const oneResource = await allResources.find(resource => resource.id == id)
    console.log(oneResource)
    this.setState({
      formData: {
        name: oneResource.name,
        link: oneResource.link,
        description: oneResource.description
      }
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }

  createSubmit = async () => {
    if (this.props.selected) {
      await updateResource(this.state.formData, this.props.selected)
      await this.props.setResource('')
    } else {
      const user_id = this.props.user.id
      await createResource(this.state.formData, user_id);
    }
    await this.props.getResources()
    this.props.history.push('/');
  }

  render() {
    return (
      <>

        <Route exact path='/resources/:id' render={(props) => (
          <EditResource
            {...props}
            createSubmit={this.createSubmit}
            handleChange={this.handleChange}
            formData={this.state.formData}
            setEdit={this.setEdit}
            getOneResource={this.getOneResource}
            getResources={this.getResources}
            user={this.state.currentUser}
          />
        )} />

        <Route exact path='/resources' render={(props) => (
          <CreateResource
            {...props}
            user={this.props.user}
            formData={this.state.formData}
            handleChange={this.handleChange}
            createSubmit={this.createSubmit}
          />
        )} />
      </>
    )
  }
}

export default withRouter(ResourcesIndex)