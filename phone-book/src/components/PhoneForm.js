import React, { Component } from 'react'

export default class PhoneForm extends Component {

  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    // prevent page reloading
    e.preventDefault();
    // 상태값을  onCreate를 통하여 부모에게 전달
    this.props.onCreate(this.state); //submit 이 발생하면 props 로 받은 함수를 호출하여 App 에서 파라미터로 받은 값을 사용 할 수 있도록
    // 상태 초기화
    this.setState({
      name: '',
      phone: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          placeholder="이름"
          value={this.state.name}  // 나중에 우리가 데이터를 등록하고나면 이 name 값을 공백으로 초기화 해줄것임, 그렇게 초기화 됐을 때 input 에서도 반영이 되도록 value 를 설정해준것
          onChange={this.handleChange}
          name="name"
        />
        <input 
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <div>{this.state.name} {this.state.phone}</div>
        <button type="submit">등록</button>
      </form>
    )
  }
}
