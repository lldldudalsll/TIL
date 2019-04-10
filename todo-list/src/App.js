import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList'

class App extends Component {

  id = 3 // 이미 0,1,2 가 존재하므로

  state = {
    input: '',
    todos: [
      { id: 0, text: ' Introduce React', checked: false },
      { id: 1, text: ' Using JSX', checked: true },
      { id: 2, text: `Let's Understood LifeCycle`, checked: false }
    ]
  }

  handleChange = (e) => {   // 텍스트 내용 바뀌면 state 업데이트
    this.setState({
      input: e.target.value // input의 다음 바뀔 값
    })
  }

  handleCreate = (e) => {   // 버튼이 클릭되면 새로운 todo 생성 후 todos 업데이트
    const { input, todos } = this.state;
    this.setState({
      input: '', // 인풋 비우고
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    })
  }

  handleKeyPress = (e) => {  // 인풋에서 Enter 누르면 버튼을 클릭한것과 동일한 작업진행하기
    if (e.key === 'Enter') { // 눌려진 키가 엔터면 handleCreate 호출
      this.handleCreate();
    }
  }

  render() {
    const { input, todos } =  this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress
    } = this; // 오 이런것도 돼~
    return (
      <div>
        <TodoListTemplate form={
          <Form 
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
          />}>
          <TodoItemList todos={todos}/>
        </TodoListTemplate>
      </div>
    );
  }
}

export default App;
