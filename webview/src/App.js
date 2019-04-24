import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, Results, Sample, Manager } from './pages';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Dashboard} />
      <Route path="/Results" component={Results}/>
      <Route path="/Sample" component={Sample}/>
      <Route path="/Manager" component={Manager} />
    </div>
  );
}

export default App;
