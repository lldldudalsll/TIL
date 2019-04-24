import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Variants, Overview, Report } from 'pages/samples'

const Sample = ({match}) => {
  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.url}`}>Variants</Link>
        </li>   
        <li>
          <Link to={`${match.url}/overview`}>Overview</Link>
        </li>
        <li>
          <Link to={`${match.url}/report`}>Report</Link>
        </li>
      </ul>
      <Route exact path={`${match.url}`} component={Variants} />
      <Route path={`${match.url}/overview`} component={Overview} />
      <Route path={`${match.url}/report`} component={Report} />
    </div>
  )
}

export default Sample;