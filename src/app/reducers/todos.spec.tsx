import todos from './todos';
import * as types from '../constants/ActionTypes';
import {TodoAction} from '../models/todo';
import Todo from '../models/todo';
import guid from '../utils/guid';

let setup = new class {
  public todos = [];
  public todoStore = [];
  constructor() {
    this.todos.push(new Todo({text: 'Use Redux', objectId: guid()}));
    this.todos.push(new Todo({text: 'Run the tests', objectId: guid()}));
    this.todos.push(new Todo({text: 'Fix the tests', objectId: guid(), completed: true}));

    this.todoStore.push(todos());
    this.todoStore.push(todos([
      this.todos[1],
    ], new TodoAction()));
    this.todoStore.push(todos([
      this.todos[1],
    ], new TodoAction({
      type: types.ADD_TODO,
      todo: this.todos[2]
    })));
    this.todoStore.push(todos([
      this.todos[1],
      this.todos[2]
    ], new TodoAction({
      type: types.ADD_TODO,
      todo: this.todos[3]
    })));
  };
};

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(
      setup.todoStore[0][0] instanceof Todo
    ).toBeTruthy();
  });

  it('should handle ADD_TODO', () => {
    expect(
      setup.todoStore[1][0] instanceof Todo
    ).toBeTruthy();

    expect(
      setup.todoStore[2][0] instanceof Todo
    ).toBeTruthy();

    expect(
      setup.todoStore[2][0].text
    ).toEqual(setup.todos[2].text);

    expect(
      setup.todoStore[3][0] instanceof Todo
    ).toBeTruthy();

    expect(
      setup.todoStore[3][0].text
    ).toEqual(setup.todos[3].text);
  });

  it('should handle DELETE_TODO', () => {
    expect(
      todos([
        setup.todos[0],
        setup.todos[1]
      ], new TodoAction({
        type: types.DELETE_TODO,
        todo: setup.todos[1]
      }))
    ).toEqual(setup.todoStore[0]);
  });

  it('should handle EDIT_TODO', () => {
    let updatedTodo1 = Object.assign(setup.todos[1], {text: setup.todos[2].text});
    expect(
      todos([
        setup.todos[0],
        setup.todos[1]
      ], new TodoAction({
        type: types.EDIT_TODO,
        todo: updatedTodo1
      }))
    ).toEqual(
      todos([
        setup.todos[0],
        updatedTodo1
      ], new TodoAction())
    );
  });

  it('should handle COMPLETE_TODO', () => {
    let completedTodo1 = Object.assign(setup.todos[1], {completed: !setup.todos[1].completed});
    expect(
      todos([
        setup.todos[0],
        setup.todos[1]
      ], new TodoAction({
        type: types.COMPLETE_TODO,
        todo: setup.todos[1]
      }))
    ).toEqual([
      todos([
        setup.todos[0],
        completedTodo1
      ], new TodoAction())
    ]);
  });

  it('should handle COMPLETE_ALL', () => {
    let doneTodo2 = Object.assign(setup.todos[2], {completed: true});
    let undoneTodo3 = Object.assign(setup.todos[3], {completed: false});
    expect(
      todos([
        setup.todos[2],
        setup.todos[3]
      ], new TodoAction({
        type: types.COMPLETE_ALL
      }))
    ).toEqual([
      doneTodo2,
      setup.todos[3]
    ]);

    // unmark if all todos are currently completed
    expect(
      todos([
        doneTodo2,
        setup.todos[3]
      ], new TodoAction({
        type: types.COMPLETE_ALL
      }))
    ).toEqual([
      setup.todos[2],
      undoneTodo3
    ]);
  });

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      todos([
        setup.todos[2],
        setup.todos[3]
      ], new TodoAction({
        type: types.CLEAR_COMPLETED
      }))
    ).toEqual([
      setup.todos[2]
    ]);
  });

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    expect(
      [
        {
          type: types.COMPLETE_TODO,
          todo: setup.todos[0]
        }, {
          type: types.CLEAR_COMPLETED
        }, {
          type: types.ADD_TODO,
          todo: setup.todos[1]
        }
      ].reduce(todos, [
        setup.todos[0],
        setup.todos[2]
      ])
    ).toEqual([
        setup.todos[1],
        setup.todos[3]
    ]);
  });
});
