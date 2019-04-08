import React, { Component } from 'react'

export default class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    }
  }

  state = {
    // 수정버튼 클릭시 editing 값을 true 로 설정해줄것
    // 이 값이 true 일 경우 기존의 텍스트 형태로 보여주던 값들을 input 형태로 보여주게 될것.
    editing: false,
    // input 의 값은 유동적이기 때문에 input 값을 담기 위해서 각 필드를 위한 값도 설정
    name: '',
    phone: ''
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
    if (!this.state.editing
        && !nextState.editing
        && nextProps.info === this.props.info) {
          return false; // false 를 반환하면 해당 조건에는 render를 호출하지 않음.
        }
        // 나머지 경우엔 리렌더링 함.
        return true;
  }

  componentDidUpdate(prevProps, prevState) {
    // 여기엔 editing 값이 바뀔 때 처리 할 로직
    // 수정을 눌렀을땐, 기존의 값이 input 에 나타나고
    // 수정을 적용하면, input 의 값들을 부모한테 전달해줌.
    const { info, onUpdate } = this.props;
    if(!prevState.editing && this.state.editing) {
      // editing 값이 false -> true 로 전환 될 때
      // info 의 값을 state 에 넣어준다.
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    if (prevState.editing && !this.state.editing) {
      // editing 값이 true -> false 로 전환 될 때
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  handleRemove = () => {
    // 삭제 버튼이 클릭되면 onRemove 에 id 를 넣어서 호출
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    })
  }

  // input에서 onChange 이벤트가 발생 될 때 호출되는 함수
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    // console.log('render PhoneInfo ' + this.props.info.id)
    const style = {
      border: '1px solid #181818',
      padding: '8px',
      margin: '8px'
    }

    const { editing } = this.state;
    // 수정모드
    if (editing) {
      return (
        <div style={style}>
          <div>
            <input 
              value={this.state.name} 
              // 데이터를 등록하고 나면 name 값을 
              // 공백으로 초기화 해주었으므로 초기화 됐을때 input에서도 반영되도록 설정한 것.
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input 
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      )
    }

    // 일반모드
    const {
      name, phone
    } = this.props.info;

    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>update</button>
        <button onClick={this.handleRemove}>remove</button>
      </div>
    )
  }
}
