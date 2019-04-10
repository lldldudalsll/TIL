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

  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾는다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체
    const nextTodos = [...todos];  // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    })
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id) // 받아온 id 와 다른것만 필터링
    })
  }

  render() {
    const { input, todos } =  this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
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
          <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
        </TodoListTemplate>
      </div>
    );
  }
}

export default App;
