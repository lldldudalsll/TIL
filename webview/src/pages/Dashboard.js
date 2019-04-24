import React from 'react';

const Dashboard = ({history}) => {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Hello, here is Dashboard area
      </p>
      <button onClick={() => {
        history.push('/results/10')
      }}>
        go results page
      </button>
    </div>
  )
}

export default Dashboard;