import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove } = this.props;
    // props 로 받아온 객체배열을 TodoItem 컴포넌트 배열로 변환하기
    // const todoList = todos.map(
    //   // 파라미터 안에서 비구조화 할당하여 객체 내부의 값들을 따로 레퍼런스 만들어줌
    //   ({id, text, checked}) => (
    //     <TodoItem
    //       id={id}
    //       text={text}
    //       checked={checked}
    //       onToggle={onToggle}
    //       onRemove={onRemove}
    //       key={id} // 배열 렌더링시 key 값이 꼭 필요!
    //     />
    //   )
    // )
    const todoList = todos.map(  // 이렇게도 가능!!
      (todo) => (
        <TodoItem
          {...todo}
          onToggle={onToggle}
          onRemove={onRemove}
          key={todo.id}
        />
      )
    );
    return (
      <div>
        {todoList}
      </div>
    );
  }
}

export default TodoItemList;