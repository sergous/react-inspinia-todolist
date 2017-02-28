import * as Backendless from 'backendless';
import Todo from '../models/todo';
import {Env} from '../constants/Env';
import guid from '../utils/guid';

class TodoService {
  constructor() {
    Backendless.initApp(Env.APP_ID, Env.APP_KEY, Env.APP_VER);
  }
  saveTodo(todo: Todo): Todo {
    if (Env.CURRENT === Env.TEST) {
      try {
        todo.objectId = todo.objectId || guid();
        return todo;
      } catch (e) {
        console.log(e);
      }
    }
    try {
      //noinspection TypeScriptValidateTypes
      return Backendless.Persistence.of(Todo).save(todo);
    } catch (error) {
      console.log(error);
    }
  }
  removeTodo(todo: Todo): Object {
    if (Env.CURRENT === Env.TEST) {
      return {};
    }
    try {
      return Backendless.Persistence.of(Todo).remove(todo);
    } catch (error) {
      console.log(error);
    }
  }
  getTodos(): Todo[] {
    if (Env.CURRENT === Env.TEST) {
      return [];
    }
    try {
      let result = Backendless.Persistence.of(Todo).find();
      // noinspection TypeScriptUnresolvedVariable
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new TodoService();
