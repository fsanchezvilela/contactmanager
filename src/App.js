//Initialize React boys
import React, { Component } from 'react'; // React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//Contacts Mechonics
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
//Header
import Header from './components/layout/Header';
//Pages
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
//Test
import Test from './components/test/Test';
//Provider - Consumer
import { Provider } from './context';
//CSS and Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  // React.Component pass data intro de component is PROPS
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch /*Routes*/>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route exact path="/test" component={Test} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

/*
const name = 'Larry';
    const showHello = true;
    const showMath = true;
    const num1 = 40;
    const num2 = 23;

    let math;
    if (showMath) {
      math = (
        <h4>
          {num1} + {num2} = {num1 + num2}
        </h4>
      );
    } else {
      math = null;
    }

 return React.createElement(
      'div', //usando js normal
      { classname: 'App' },
      React.createElement('h1', null, 'The App Component')
      */
//          is true         else
// condition   ?  <do stuff> :  <do struf>
