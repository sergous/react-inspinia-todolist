/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import Todo from '../models/todo';

interface ITodoItemProps {
  todo: any;
  editTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  completeTodo: (todo: Todo) => void;
}

interface ITodoItemState {
  editing: boolean;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  static propTypes = {
    todo: React.PropTypes.object.isRequired,
    editTodo: React.PropTypes.func.isRequired,
    deleteTodo: React.PropTypes.func.isRequired,
    completeTodo: React.PropTypes.func.isRequired
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange() {
    this.props.completeTodo(this.props.todo);
  }

  handleClick() {
    this.props.deleteTodo(this.props.todo);
  }

  handleDoubleClick() {
    this.setState({editing: true});
  }

  handleSave( todo: Todo ) {
    if (!todo.text || todo.text.length === 0) {
      this.props.deleteTodo(this.props.todo);
    } else {
      this.props.todo.text = todo.text;
      this.props.editTodo(this.props.todo);
    }
    this.setState({editing: false});
  }

  render() {
    const {todo} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.handleSave}
          />
      );
    } else {
      element = (
        <span>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={this.handleChange}
            />
          <label
            onDoubleClick={this.handleDoubleClick}
            >
            {todo.text}
          </label>
          <button
            className='btn pull-right'
            onClick={this.handleClick}
          ><i className='fa fa-times'></i></button>
        </span>
      );
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}
        >
        {element}
      </li>
    );
  }
}

export default TodoItem;
