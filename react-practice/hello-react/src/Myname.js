import React, { Component } from 'react'

export default class Myname extends Component {
  static defaultProps = { // props의 기본값 설정.
    name: 'Company'
  }
  render() {
    return (
      <div>
        Hi Everyone, <br />
        Here is SoftWare Development Team in {this.props.name}
      </div>
    )
  }
}

// Myname.defaultProps = {
//   name: '기본 이름'
// } 이런식으로도 가능!


// 함수형 컴포넌트

// const Myname = ({name}) => {
//   return (
//     <div>
//       hello ! my name is {name} ok?
//     </div>
//   )
// }

// export default Myname;

// 함수형 컴포넌트와 클래스형 컴포넌트의 주요 차이점
// 우리가 조만간 배우게 될 state 와 LifeCycle 이 빠져있다
// 그래서, 컴포넌트 초기 마운트가 아주 미세하게 빠르고, 메모리 자원을 덜 사용합니다. 
// 미세한 차이이니, 컴포넌트를 무수히 많이 렌더링 하게 되는게 아니라면 
// 성능적으로 큰 차이는 없습니다