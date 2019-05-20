# 이벤트 핸들링
유저가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것 = (event)

## 리액트의 이벤트 시스템
```
<button onClick={() => {
  this.setState({
    number: this.state.number + 1
  })
}}>더하기</button>
```

### 이벤트를 사용할때 주의 사항
1. 이벤트 이름은 camelCase 로 작성 `ex) onClick, onKeyUp`  
2. `이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수형태의 객체 또는 값을 전달`
   - HTML에서 이벤트를 설정할 때는 큰 따옴표 안에 실행할 코드를 넣었지만 리액트에서는 함수형태의 객체를 전달
3. DOM 요소에만 이벤트를 설정할 수 있음.
   - 즉, div, button, input, form, span 등 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없음. 따라서 컴포넌트에 자체적으로 이벤트를 설정할 수는 없지만 전달받은 props를 컴포넌트 내부의 DOM 이벤트로는 설정가능.

### 이벤트 종류
- Clipboard
- Form
- Composition
- Mouse
- Keyboard
- Selection
- Focus
- Touch
- UI
- Image
- Wheel
- Animation
- Media
- Transition 


 ```   
import React, { Component } from 'react';

class EventPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input 
          type="text"
          name="message"
          placeholder="write anything"
          onChange={
            (e) => {
              console.log(e)
            }
          }  
        />
      </div>
    );
  }
}

export default EventPractice;
```

여기서 콘솔에 기록되는 e 객체는 SyntheticEvent 로 웹 브라우저의 네이티브 이벤트를 감싸는 객체.  
네이티브 이벤트와 인터페이스가 같으므로 순수 JS에서 HTML을 사용할 때와 동일하게 사용하면 됨.

### 임의 메서드 만들기

위의 주의사항에서 `이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수형태의 객체 또는 값을 전달` 이라고 배움.  

그렇기에 이벤트를 처리할 때 랜더링을 하는 동시에 함수를 만들어서 전달해 주었는데 이방법 대신 함수를  
미리 준비하여 전달하는 방법도 있음.  
성능상으로는 별 차이가 없지만 가독성이 높아진다.

#### 기본방식
```
import React, { Component } from 'react';

class EventPractice extends Component {

  state = {
    massage: ''
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.hancleClick = this.handleClick.binc(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleClick() {
    alert(this.state.message);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input 
          type="text"
          name="message"
          placeholder="write anything"
          value={this.state.message}
          onChange={this.handleChange}  
        />
        <button onClick={this.handleClick}
        }>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```
`컴포넌트에 임의 메서드를 만들면 기본적으로 this에 접근할 수 없다.` 따라서 컴포넌트의 생성자 메서드인  
constructor에서 각 메서드를 this와 바인딩 해주어야 함.  
Bind란 '묶다' 라는 뜻임. 즉 메서드에서 this 를 사용할 수 있도록 메서드에 this 를 묶어주는 것.  
(이 작업을 하지 않으면 메서드에서 this를 부를때 undefined가 리턴된다.)  


#### Property Initializer Syntex를 사용한 메서드 작성
```
import React, { Component } from 'react';

class EventPractice extends Component {

  state = {
    massage: ''
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  handleClick = () => {
    alert(this.state.message);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input 
          type="text"
          name="message"
          placeholder="write anything"
          value={this.state.message}
          onChange={this.handleChange}  
        />
        <button onClick={this.handleClick}
        }>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```
메서드 바인딩은 생성자 메서드에서 하는 것이 정석.  
그러나 이 작업은 새 매서드를 만들 때마다 constructor도 수정해야하기 때문에 불편  
`바벨의 transform-class-properties 문법을 사용하여 화살표 함수형태로 메서드를 정의!`  

#### input 여러 개를 핸들링
input이 여러개일때 메서드를 여러개 만들지 않고 event객체를 활용하여 쉽게 처리하는 방법이 있다.  
e.target.name을 활용한 방법으로 onChange 이벤트 핸들러에서 e.target.name은  
해당 input의 name을 가르킨다. 이 값을 이용하여 state를 설정해보자.

```
import React, { Component } from 'react';

class EventPractice extends Component {

  state = {
    username: '',
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick = () => {
    alert(this.state.username + ': ' + this.state.message);
    this.setState({
      username: '',
      message: ''
    });
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input 
          type="text"
          name="message"
          placeholder="write anything"
          value={this.state.message}
          onChange={this.handleChange}  
        />
        <button onClick={this.handleClick}
        }>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```

자바스크립트를 잘 안다면 익숙할텐데, `[]안에 있는 값을 key값으로 사용하는 것`  

#### onKeyPress 이벤트 핸들링

comment input에서 Enter를 눌렀을 때 handleClick 메서드를 호출하도록 해보자.  
```
import React, { Component } from 'react';

class EventPractice extends Component {

  state = {
    username: '',
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick = () => {
    alert(this.state.username + ': ' + this.state.message);
    this.setState({
      username: '',
      message: ''
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleClick();
    }
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input 
          type="text"
          name="message"
          placeholder="write anything"
          value={this.state.message}
          onChange={this.handleChange}  
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleClick}
        }>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```