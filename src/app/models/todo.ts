import {IAction} from '~react-redux~redux';
import guid from '../utils/guid';

interface ITodo extends Object {
    text: string;
    completed?: boolean;
    objectId?: string;
    id?: number;
}

class TodoDefaults implements ITodo {
    text: string;
    completed: boolean;

    constructor() {
        this.text = '';
        this.completed = false;
    }

}

export default class Todo implements ITodo {
    text: string;
    completed: boolean;
    objectId?: string;
    id?: number;

    constructor(options?: ITodo) {
        options = Object.assign(new TodoDefaults(), options);
        this.text = options.text;
        this.completed = options.completed;
    }
}

export interface ITodoAction extends IAction {
    type: string;
    todo?: Todo;
}

class TodoActionDefaults implements ITodoAction {
    type: string;
    todo?: Todo;

    constructor() {
        this.type = '';
        this.todo = new Todo();
    }
}

export class TodoAction implements ITodoAction {
    type: string;
    todo?: Todo;
    constructor(options?: ITodoAction) {
        options = Object.assign(new TodoActionDefaults(), options);
        this.type = options.type;
        this.todo = options.todo;
    }
}
