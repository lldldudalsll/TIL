# ref: DOM에 이름달기
일반 HTML에서 DOM요소에 이름을 달 때는 id를 사용합니다.  
    
    // DOM요소의 id
    <div id="my-element"></div>
특정 DOM요소에 어떤 작업을 해야 할 때 이렇게 요소에 id를 달면 css에서 특정 id에  
특정 스타일을 적용하거나 자바스크립트에서 해당 id를 가진 요소를 찾아서 작업.  
이렇게 HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼   
리액트 프로젝트 내부에서 DOM에 이름을 다는 방법이 있다.    
이것이 바로 ref(reference의 줄임) 개념.  

#### 리액트 컴포넌트 안에서 id를 사용하면 안될까?
리액트 컴포넌트 안에서도 id를 사용할 수는 있다. JSX 안에서 DOM에 id를 달면 해당 DOM을 렌더링할 때 그대로 전달되지만 특수한 경우가 아니라면 사용을 권장하지 않음.  
예를들어 같은 컴포넌트를 여러 번 사용한다고 가정했을때 html에서 DOM의 유일한 id는 유일(unique)해야 하는데 이런 상황에서는 중복 id를 가진 DOM이 여러개 생기니 잘못된 사용이 된다.  
ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하기 때문에 이런 문제가 생기지 않는다.  
대부분은 id를 사용하지 않고도 원하는 기능을 구현할 수 있지만, 다른 라이브러리나 프레임워크와 함께 id를 사용해야 하는 상황이 발생할 수 있다. 이런 상황에서는 컴포넌트를 만들 때 마다 id 뒷 부분에 추가 텍스트를 붙여서 (예: button01 button02..) 중복 id가 발생하는 것을 방지해야 한다.


## ref는 어떤상황에서 사용해야 할까?  
일단 특정 DOM에 작업을 해야 할 때 ref를 사용한다는 것은 이미 파악. 하지만 대체 '어떤 작업'을 할 때 ref를 사용해야 할까?  

정답은 "DOM을 꼭 직접적으로 건드려야 할 때"  

##### ref 가 필요 없는 경우
```
// ValidationSample.css
.success {
    background-color: green;
}

.failure {
    background-color: red;
}
```

```
// ValidationSample.js
import React, { Component } from 'react';
import './ValidationSample.css'

class ValidationSample extends Component {

  state = {
    password: '',
    clicked: false,
    validated: false
  }

  handleChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000'
    })
  }
  render() {
    return (
      <div>
        <input 
          type="password"
          value={this.state.value} 
          onChange={this.handleChange}
          className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''} 
        />
        <button
          onClick={this.handleClick}
        >validate</button>
      </div>
    );
  }
}

export default ValidationSample;
```

#### DOM을 꼭 사용해야 하는 상황
위의 예제에서는 state를 사용하여 필요한 기능을 구현했지만, 가끔 state만으로 해결할 수 없는 기능이 있다.  

- 특정 input에 포커스 주기
- 스크롤 박스 조작하기
- Canvas 요소에 그림그리기 등 

이때는 어쩔 수 없이 DOM에 직접적으로 접근해야 하는데, 바로 ref 사용.  
 
## ref 사용.

### 사용법
ref를 달아야 하는 DOM에 ref 속성을 추가할 때는 props를 설정하듯이 하면 된다. ref 값으로는 콜백 함수를 전달한다.  
콜백 함수는 ref를 파라미터로 가지며, 콜백 함수 내부에서 컴포넌트의 멤버 변수에 ref를 담는 코드를 작성한다.
```
<input ref={(ref) => {this.input=ref}} />
```
이렇게 하면 앞으로 this.input 은 input 요소의 DOM을 가르킨다. ref 이름은 자유롭게 지정 가능.  
DOM타입과 관계없이 this.ironman = ref 처럼 마음대로 지정.  

### 적용
버튼을 눌렀을 때 포커스가 다시 input 쪽으로 넘어가도록 해보자.
```
// input에 ref 달기
<input 
  ref={(ref) => this.input = ref}
  (...)
/>
```
```
// 버튼 onClick 이벤트 코드 수정
handleClick = () => {
  this.setState({
    clicked: true,
    validated: this.state.password === '0000'
  })
  this.input.focus();
}
```

## 컴포넌트에 ref 달기
리액트에서는 컴포넌트에도 ref를 달 수 있다. 이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 쓴다.  
컴포넌트에 ref를 다는 방법은 DOM에 ref를 다는 방법과 동일.  

### 사용법
```
<MyComponent
  ref={(ref) => this.myComponent = ref}
/>
```
이렇게 하면 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있다. 즉, 내부의 ref에도 접근할 수 있다.  
(예: myComponent.handleClick, myComponent.input)  
이번에는 스크롤 박스가 있는 컴포넌트를 하나 만들고, 스크롤바를 아래로 내리는 작업을 부모컴포넌트에서 실행해 보자.
```
import React, { Component } from 'react';

class ScrollBox extends Component {
  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative'
    }

    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, black)'
    }
    return (
      <div
        style={style}
        ref={(ref) => this.box = ref}>
        <div style={innerStyle} />
      </div>
    );
  }
}

export default ScrollBox;
```

### 컴포넌트에 메서드 생성
컴포넌트에 스크롤바를 맨 아래쪽으로 내리는 메서드를 만들자. 자바스크립트로 스크롤바를 내릴 때는 DOM노드가 가진 다음 값들을 사용.  

- scrollTop: 세로 스크롤바 위치 (0~350)
- scrollHeight: 스크롤 박스 내부의 높이 (650)
- clientHeight: 스크롤 박스 외부의 높이 (300)

스크롤바를 맨 아래쪽으로 내리려면 scrollHeight 에서 clientHeight 높이를 빼면 된다.
```
class ScrollBox extends Component {

  scrollBottom = () => {
    const { scrollHeight, clientHeight } = this.box;
    console.log(this.box)
    this.box.scrollTop = scrollHeight - clientHeight;
  }
  render() {
    (...)
  }
}

export default ScrollBox;
```

이렇게 만든 메서드는 부모 컴포넌트인 App 컴포넌트에서 ScrollBox에 ref를 달면 사용할 수 있다.

### 컴포넌트에 ref 달고 내부 메서드 사용
그럼 이제 App컴포넌트에서 ScrollBox 에 ref를 달고 버튼을 만들어 누르면 ScrollBox 컴포넌트의 scrollBottom 메서드를 실행하도록 코드 작성
```
class App extends Component {
  render() {
    return (
      <div className="App">
        <ScrollBox ref={(ref) => this.scrollBox = ref}/>
        <button onClick={() => this.scrollBox.scrollBottom()}>end point</button>
      </div>
    );
  }
}

export default App;
```
여기서 주의할 점이 문법상으로는 onClick = {this.scrollBox.scrollBottom} 같은 형식으로 작성해도 틀린 것은 아니나, 컴포넌트가 처음 렌더링될 때는 this.scrollBox 값이 undefined 이므로 this.scrollBox.scrollBottom 값을 불러오는 과정에서 오류가 발생.  
화살표 함수 문법을 사용하여 아예 새로운 함수를 만들고 그 내부에서 this.scrollBox.scrollBottom 메서드를 실행하면, 버튼을 누를 때 (이미 한번 렌더링 해서 this.scrollBox를 설정한 시점) this.scrollBox.scrollBottom 값을 읽어와서 실행하므로 오류가 발생하지 않음.