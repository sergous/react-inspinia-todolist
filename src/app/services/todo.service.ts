import * as Backendless from 'backendless';
import Todo from '../models/todo';
import {Env} from '../constants/Env';
import guid from '../utils/guid';

export default (function TodoService() {
    Backendless.initApp(Env.APP_ID, Env.APP_KEY, Env.APP_VER);

    return {
        saveTodo: function (todo: Todo): Todo {
            if (Env.CURRENT === Env.TEST) {
              return Object.assign(todo, {objectId: guid()});
            }
            try {
                // noinspection TypeScriptUnresolvedVariable
                return Backendless.Persistence.of(Todo).save(todo).data;
            } catch (error) {
                console.log(error);
            }
        },
        removeTodo: function (todo: Todo): Object {
            if (Env.CURRENT === Env.TEST) {
              return {};
            }
            try {
                return Backendless.Persistence.of(Todo).remove(todo);
            } catch (error) {
                console.log(error);
            }
        },
        getTodos: function (): Todo[] {
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
    };
}());
