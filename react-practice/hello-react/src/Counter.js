import React, { Component } from 'react'

const Problematic = () => {
  throw (new Error('버그가 나타났다'));
  return (
    <div>

    </div>
  )
}

export default class counter extends Component {

  constructor(props) {
    super(props);
    console.log('constructor');
  }
  
  componentWillMount() {
    console.log('componentWillMount (deprecated)');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 5 의 배수라면 리렌더링 하지 않음
    console.log('shouldComponentUpdate');
    if (nextState.number % 5 === 0) return false;
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }
  
  componentDidCatch(error, info) {
    this.setState({
      error: true
    })
  }

  state = {
    number: 0,
    error: false
  }

  // handleIncrease = () => {
  //   this.setState({
  //     number: this.state.number + 1
  //   });
  // }

  // handleDecrease = () => {
  //   this.setState({
  //     number: this.state.number - 1
  //   });
  // }

  handleIncrease = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  }

  handleDecrease = () => {
    this.setState(
      ({ number }) => ({
        number: number - 1
      })
    );
  }

  render() {
    console.log('render');
    if(this.state.error) return ( <h1>에러발생!</h1> )
    return (
      <div>
        <h1>Counter</h1>
        <div className="counterValue">value: {this.state.number}</div>
        { this.state.number === 4 && <Problematic />}
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    )
  }
}
