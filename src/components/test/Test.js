import React, { Component } from 'react';
//Lifecycle Methods React
class Test extends Component {
  state = {
    test: 'test'
  };
  //parsing data
  componentDidMount() {
    //send a request to the api
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json()) // get request
      .then((
        data //get data
      ) =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }
  /*//call inicial request step event como gamemaker
  componentDidMount() {
    console.log('componentDidMount...');
  }
  //call inicial pero primero como start event first frame
  componentWillMount() {
    console.log('componentWillMount...');
  }

  //only run when the component update and re-render
  componentDidUpdate() {
    console.log('componenDidUpdate...');
  }

  //only run when the component update but first
  componentWillUpdate() {
    console.log('componentWillUpdate...');
  }
  //Run when the component receive new propiedades se usa mucho con redux
  componentWillReceiveProps(nextProps, nextState) {
    console.log('componentWillReceiveProps...');
  }
  // es el sustituto de componentWIllreceiveProps
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('componentWillReceiveProps...');
    return null;
  }
  // pre-commit phase. calcula los cambios al dom pero en el Virtual Dom. antes que el dom updatee
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate...');
  }*/

  render() {
    //parsing the data to html using jsx
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <h1>{body}</h1>
      </div>
    );
  }
}

export default Test;
