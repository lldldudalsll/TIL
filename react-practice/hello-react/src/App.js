import React, { Component } from 'react';
import './App.css';
import Myname from './Myname';
import Counter from './Counter'

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          hi there
        </div>
        <div className="Bpp">
          <Myname name="Ngenebio"/>
        </div>
        <div className="counter">
          <Counter />
        </div>
      </div>
    );
  }
}

export default App;
