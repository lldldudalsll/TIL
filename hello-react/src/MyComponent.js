import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {

  static defaultProps = {
    name: 'john'
  }

  static propTypes = {
    name: PropTypes.string,  // name props 타입을 문자열로 설정
    age: PropTypes.number.isRequired // 필수 propTypes 설정
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        My name is {this.props.name}
        저는 {this.props.age} 살 입니다.
      </div>
    );
  }
}

// MyComponent.defaultProps = {
//   name: 'jackson'
// }
// MyComponent.propTypes = {
//   name: PropTypes.string,
//   age: PropsTypes.number.isRequired
// }

export default MyComponent;