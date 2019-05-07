# 이벤트 핸들링

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
2. `이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수형태의 값을 전달`
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
