import React, { useState } from "react";
import styled from "styled-components";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContainer>
      <Title>Todo List</Title>
      <InputContainer>
        <TodoInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <AddButton onClick={addTodo}>Add</AddButton>
      </InputContainer>
      <TodoItems>
        {todos.map((todo) => (
          <TodoItem key={todo.id} completed={todo.completed}>
            <Checkbox type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <TodoText>{todo.text}</TodoText>
            <DeleteButton onClick={() => deleteTodo(todo.id)}>×</DeleteButton>
          </TodoItem>
        ))}
      </TodoItems>
    </TodoContainer>
  );
};

// Styled Components
const TodoContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const TodoInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const TodoItems = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  opacity: ${(props) => (props.completed ? 0.7 : 1)};
`;

const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const TodoText = styled.span`
  flex: 1;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff5252;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;

  &:hover {
    color: #ff0000;
  }
`;

export default TodoList;
