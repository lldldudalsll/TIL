import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, Results, Sample, Manager, Posts } from 'pages';
import Menu from 'components/Menu';

function App() {
  return (
    <div>
      <Menu />
      <Route exact path="/" component={Dashboard} />
      <Route path="/Results/:number?" component={Results}/>
      <Route path="/Sample" component={Sample}/>
      <Route path="/Manager" component={Manager} />
      <Route path="/Posts" component={Posts}/>
    </div>
  );
}

export default App;
