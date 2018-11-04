import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  // get the edit state data to the from
  async componentDidMount() {
    //get the id from the params
    const { id } = this.props.match.params;
    //match the id and put in the req res to the params
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    // get the data to response
    const contact = res.data;

    this.setState({
      //change the state
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }
  //adding contact function
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //CHeck for Errors

    if (name === '') {
      this.setState({ errors: { name: 'Name is Required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is Required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    //Updated object
    const updContact = {
      name,
      email,
      phone
    };
    //parse the id data (its like bodyparser)
    const { id } = this.props.match.params;
    //Edit Req/Res
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    //Dispatch the data
    dispatch({ type: 'UPDATE_CONTACT', payload: res.data }); // el payload es la data del response

    //clear the form
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    //Redirect to home after adding user. using the push pero no clerea el state es decir si redirecciona pero el contacto sigue ahi
    this.props.history.push('/');
  };
  // Get the value from the form input e is the target this name is the name atrribute
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
