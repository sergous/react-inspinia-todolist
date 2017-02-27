import Todo from './todo';
import {TodoAction} from './todo';
describe('Todo', () => {
  it('should be object', () => {
    expect(
      new Todo() instanceof Object
    ).toBeTruthy();
  });
  describe('defaults', () => {
    let todo = new Todo();
    it('should be set', () => {
      expect(
        todo
      ).toEqual({
        text: '',
        completed: false
      });
    });
    it('should be set', () => {
      expect(
        todo.objectId
      ).toBeUndefined();
    });
  });
});

describe('TodoAction', () => {
  it('should be object', () => {
    expect(
      new TodoAction() instanceof Object
    ).toBeTruthy();
  });
  describe('defaults', () => {
    let todoAction = new TodoAction();
    it('should be set', () => {
      expect(
        todoAction
      ).toEqual({
        type: '',
        todo: new Todo(),
      });
    });
    it('should have todo', () => {
      expect(
        todoAction.todo
      ).toBeDefined();
    });
  });
});
