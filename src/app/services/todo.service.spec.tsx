import TodoService from './todo.service';
import Todo from '../models/todo';

describe('TodoService', () => {
  let todos = TodoService.getTodos();
  it('should get empty todos', () => {
    expect(
      todos.length
    ).toEqual(0);
  });
  let todo = TodoService.saveTodo(new Todo({text: 'Todo to save'}));
  it('should save todo', () => {
    expect(
      todo.objectId
    ).toBeDefined();
  });
  it('should remove todo', () => {
    expect(
      TodoService.removeTodo(todo) instanceof Object
    ).toBeTruthy();
  });
});
