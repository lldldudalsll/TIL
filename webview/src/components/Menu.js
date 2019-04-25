import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink, withRouter } from 'react-router-dom';

const Menu = () => {

  const activeStyle = {
    color: 'purple',
    fontSize: '1.5rem'
  }
  return (
    <div>
      {/* <ul>
        <li><Link to ="/">Dashboard</Link></li>
        <li><Link to ="/results">Results</Link></li>
        <li><Link to ="/sample">Sample</Link></li>
        <li><Link to ="/manager">Manager</Link></li>
      </ul> */}
      <ul>
        <li><NavLink exact to ="/" activeStyle={activeStyle}>Dashboard</NavLink></li>
        <li><NavLink to ="/results" activeStyle={activeStyle}>Results</NavLink></li>
        <li><NavLink to ="/sample" activeStyle={activeStyle}>Sample</NavLink></li>
        <li><NavLink to ="/manager" activeStyle={activeStyle}>Manager</NavLink></li>
        <li><NavLink to ="/posts" activeStyle={activeStyle}>Post List</NavLink></li>
      </ul>
    </div>
  )
}

export default withRouter(Menu);