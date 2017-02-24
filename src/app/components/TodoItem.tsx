/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

interface ITodoItemProps {
  todo: any;
  editTodo: (objectId: string, text: string) => void;
  deleteTodo: (objectId: string) => void;
  completeTodo: (objectId: string) => void;
};

interface ITodoItemState {
  editing: boolean;
};

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
    this.props.completeTodo(this.props.todo.objectId);
  }

  handleClick() {
    this.props.deleteTodo(this.props.todo.objectId);
  }

  handleDoubleClick() {
    this.setState({editing: true});
  }

  handleSave(text: string) {
    if (text.length === 0) {
      this.props.deleteTodo(this.props.todo.objectId);
    } else {
      this.props.editTodo(this.props.todo.objectId, text);
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
        <div className='view'>
          <input
            className='toggle'
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
            className='destroy'
            onClick={this.handleClick}
            />
        </div>
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
