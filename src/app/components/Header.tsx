/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import TodoTextInput from './TodoTextInput';
import Todo from '../models/todo';

interface IHeaderProps {
  addTodo: (todo: Todo) => void;
};

interface IHeaderState {};

class Header extends React.Component<IHeaderProps, IHeaderState> {
  static propTypes = {
    addTodo: React.PropTypes.func.isRequired
  };
  constructor(props: any) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave( todo: Todo ) {
    if (todo.text.length !== 0) {
      this.props.addTodo(todo);
    }
  }

  render() {
    return (
      <header className='header'>
        <h1>TODO List</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder='What needs to be done?'
          />
      </header>
    );
  }
}

export default Header;
