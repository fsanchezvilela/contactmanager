import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
        // payload es data en la accion
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        // estado previo
        ...state,
        // usando map para loop y devolver el objeto editado
        contacts: state.contacts.map(
          //por cada contacto
          contact =>
            //si el id es igual al id del payload (el updContact no tiene id ya que los id vienen del json)
            contact.id === action.payload.id
              ? //entonces el payload completo es decir el body form sera el contacto
                (contact = action.payload)
              : //sino es asi entonces se queda como el contacto previo
                contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    //props de dispatch
    dispatch: action => {
      // cambiar el state es como le event state de gamemaker.
      this.setState(state => reducer(state, action));
    }
  };
  // send the get request to get contacts from the api
  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({ contacts: res.data }); //agarrando la data de la fake json db
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
