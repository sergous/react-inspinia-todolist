import * as types from '../constants/ActionTypes';
import * as actions from './index';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: types.ADD_TODO,
      text: 'Use Redux'
    });
  });

  it('deleteTodo should create DELETE_TODO action', () => {
    expect(actions.deleteTodo('18D6BD26-7B34-8BA7-FF06-C4037F578A00')).toEqual({
      type: types.DELETE_TODO,
      objectId: '18D6BD26-7B34-8BA7-FF06-C4037F578A00'
    });
  });

  it('editTodo should create EDIT_TODO action', () => {
    expect(actions.editTodo('18D6BD26-7B34-8BA7-FF06-C4037F578A00', 'Use Redux everywhere')).toEqual({
      type: types.EDIT_TODO,
      objectId: '18D6BD26-7B34-8BA7-FF06-C4037F578A00',
      text: 'Use Redux everywhere'
    });
  });

  it('completeTodo should create COMPLETE_TODO action', () => {
    expect(actions.completeTodo('18D6BD26-7B34-8BA7-FF06-C4037F578A00')).toEqual({
      type: types.COMPLETE_TODO,
      objectId: '18D6BD26-7B34-8BA7-FF06-C4037F578A00'
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
