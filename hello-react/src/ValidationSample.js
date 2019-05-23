import React, { Component } from 'react';
import './ValidationSample.css'

class ValidationSample extends Component {

  state = {
    password: '',
    clicked: false,
    validated: false
  }

  handleChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000'
    })
    this.input.focus();
  }
  render() {
    return (
      <div>
        <input 
          ref={(ref) => this.input = ref}
          type="password"
          value={this.state.value} 
          onChange={this.handleChange}
          className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''} 
        />
        <button
          onClick={this.handleClick}
        >validate</button>
      </div>
    );
  }
}

export default ValidationSample;