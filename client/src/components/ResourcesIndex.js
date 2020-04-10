import React from 'react';
import { withRouter } from 'react-router-dom';
import CreateResource from './CreateResource'
import { createResource } from '../services/api-helper';

class ResourcesIndex extends React.Component {
  state = {
    formData: {
      name: '',
      link: '',
      description: ''
    }
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
    const user_id = this.props.user.id
    await createResource(this.state.formData, user_id);
    await this.props.getResources()
    // const newResource = this.state.formData
    // this.setState(prevState => ({
    //   resources: [
    //     ...prevState.resources,  //not iterable?  also, don't care about state here, need it in App.
    //     newResource
    //   ]
    // }));
    this.props.history.push('/resources');
  }

  render() {
    return (
      <div className="createform">
        <h1>Add a new resource</h1>
        <CreateResource
          user={this.props.user}
          formData={this.state.formData}
          handleChange={this.handleChange}
          createSubmit={this.createSubmit} />
        <h3>Resources list:</h3>
        {this.props.resources.map((resource) => (
          <p key={resource.id}>{resource.name}</p>
        ))}
      </div>
    )
  }
}

export default ResourcesIndex