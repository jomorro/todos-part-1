import React, { Component } from "react";
import "./App.css";
import todoList from "./todos.json";

class TodoItem extends Component {
  state = {
    completed: this.props.completed
  };
  render() {
    return (
      <li
        className={this.props.completed ? "completed" : "not-completed"}
        id={this.props.id}
      >
        <div className="view">
          {this.props.completed ? (
            <input
              className="toggle"
              defaultChecked
              type="checkbox"
              onClick={this.handleClick}
            />
          ) : (
            <input
              className="toggle"
              type="checkbox"
              onClick={this.props.handleCheck}
            />
          )}

          <label>{this.props.title}</label>
          {this.props.children}
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map(todo => (
          <TodoItem
            id={todo.id}
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            handleCheck={this.props.handleCheck}
          >
            {this.props.children}
          </TodoItem>
        ))}
      </ul>
    );
  }
}

class App extends Component {
  state = {
    todos: todoList.slice()
  };
  handleCheck = event => {
    let id = parseInt(event.target.parentElement.parentElement.id, 10);
    let newTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed; //boolean flip
      }
      return todo;
    });

    this.setState({
      todos: newTodos
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      let maxId = Math.max.apply(
        Math,
        this.state.todos.map(function(o) {
          return o.id;
        })
      );
      this.setState({
        todos: [
          ...this.state.todos,
          {
            id: maxId + 1,
            title: event.target.value,
            completed: false
          }
        ]
      });
      event.target.value = "";
    }
  };

  handleDestroy = event => {
    let id = parseInt(event.target.parentElement.parentElement.id, 10);
    let index = this.state.todos.findIndex(element => {
      return element.id === id;
    });
    let newTodos = this.state.todos;
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
  };

  handleClear = event => {
    let newTodos = this.state.todos.filter(element => {
      return !element.completed;
    });
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What do you need to do today?"
            onKeyPress={this.handleKeyPress}
            autoFocus
          />
        </header>
        <section className="main">
          <TodoList todos={this.state.todos} handleCheck={this.handleCheck}>
            <button className="destroy" onClick={this.handleDestroy} />
          </TodoList>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button className="clear-completed" onClick={this.handleClear}>
            Clear completed
          </button>
        </footer>
      </div>
    );
  }
}

export default App;

//trying to get clear button to work where the clicked item turns to true instead of false. as well as the counter to increase with each completed task or checked after the clear button is pressed or before.
