import React, {Component} from 'react';
// import EventPractice from './EventPractice';
// import ValidationSample from './ValidationSample';
import ScrollBox from './ScrollBox';
// import MyComponent from './MyComponent';
// import BioCompany from './ex';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <MyComponent name="React" age={14}/> */}
        {/* <EventPractice /> */}
        {/* <ValidationSample /> */}
        <ScrollBox ref={(ref) => this.scrollBox = ref}/>
        <button onClick={() => this.scrollBox.scrollBottom()}>end point</button>
      </div>
    );
  }
}

export default App;
