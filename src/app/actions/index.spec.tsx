import * as types from '../constants/ActionTypes';
import * as actions from './index';
import Todo from '../models/todo';

describe('todo actions', () => {
  let todo = new Todo({text: 'Use Redux'});
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo( todo )).toEqual({
      type: types.ADD_TODO,
      todo
    });
  });

  it('deleteTodo should create DELETE_TODO action', () => {
    actions.addTodo( todo );
    expect(actions.deleteTodo( todo )).toEqual({
      type: types.DELETE_TODO,
      todo
    });
  });

  it('editTodo should create EDIT_TODO action', () => {
    actions.addTodo( todo );
    let updatedTodo = Object.assign(todo, {text: 'Use Redux everywhere'});
    expect(actions.editTodo( updatedTodo )).toEqual({
      type: types.EDIT_TODO,
      todo: updatedTodo
    });
  });

  it('completeTodo should create COMPLETE_TODO action', () => {
    actions.addTodo( todo );
    let completedTodo = Object.assign(todo, {completed: true});
    expect(actions.completeTodo(completedTodo)).toEqual({
      type: types.COMPLETE_TODO,
      todo: completedTodo
    });
  });

  it('completeAll should create COMPLETE_ALL action', () => {
    expect(actions.completeAll()).toEqual({
      type: types.COMPLETE_ALL
    });
  });

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED
    });
  });
});
