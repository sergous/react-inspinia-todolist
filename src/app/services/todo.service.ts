import * as Backendless from 'backendless';
import Todo from '../models/todo';

export default (function TodoService() {

    const APP_ID = 'B6827009-0DB1-84F3-FF46-4977EAB2F000';
    const APP_KEY = 'E7DF33A5-965F-1BD3-FF7F-78A26737F200';
    const APP_VER = 'v1';

    Backendless.initApp(APP_ID, APP_KEY, APP_VER);

    return {
        saveTodo: function (todo: Todo): Object {
            try {
                return Backendless.Persistence.of(Todo).save(todo);
            } catch (error) {
                console.log(error);
            }
        },
        removeTodo: function (todo: Todo): Object {
            try {
                return Backendless.Persistence.of(Todo).remove(todo);
            } catch (error) {
                console.log(error);
            }
        },
        getTodos: function (): Todo[] {
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
