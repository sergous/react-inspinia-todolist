/// <reference path="../../../../typings/index.d.ts" />

import * as React from 'react';
import {IDispatch} from '~react-redux~redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../Header';
import MainSection from '../MainSection';
import {addTodo, deleteTodo, editTodo, completeTodo, completeAll, clearCompleted} from '../../actions/index';
import './todo.scss';

interface IAppProps {
  todos?: any[];
  actions?: any;
}

interface IAppState {}

class Todo extends React.Component<IAppProps, IAppState> {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  render() {
    const {todos, actions} = this.props;
    return (
      <div className='todo'>
          <div className='todoapp'>
            <Header
              addTodo={actions.addTodo}
              />
            <MainSection
              todos={todos}
              actions={actions}
              />
          </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch: IDispatch) {
  // noinspection TypeScriptValidateTypes
  return {
    actions: bindActionCreators({
      addTodo,
      deleteTodo,
      editTodo,
      completeTodo,
      completeAll,
      clearCompleted
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
