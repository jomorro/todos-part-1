import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import todoList from "./todos.json";

class TodoItem extends Component {
  render() {
    if (this.props.completed) {
      return (
        <li className="completed">
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>{this.props.title}</label>
            <button className="destroy" />
          </div>
        </li>
      );
    } else {
      return (
        <li>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>{this.props.title}</label>
            <button className="destroy" />
          </div>
        </li>
      );
    }
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map(todo => (
          <TodoItem title={todo.title} completed={todo.completed} />
        ))}
      </ul>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autofocus
          />
        </header>
        <section className="main">
          <TodoList todos={todoList} />
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </div>
    );
  }
}

export default App;
