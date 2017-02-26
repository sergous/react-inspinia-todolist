import {IAction} from '~react-redux~redux';

interface ITodo extends Object {
    text: string;
    completed?: boolean;
    objectId?: string;
    id?: number;
}

class TodoDefaults extends Object implements ITodo {
    text: string;
    completed: boolean;

    constructor() {
        super();
        this.text = '';
        this.completed = false;
    }

}

export default class Todo extends Object implements ITodo {
    text: string;
    completed: boolean;
    objectId?: string;
    id?: number;

    constructor(options?: ITodo) {
        options = Object.assign(new TodoDefaults(), options);
        super(options);
    }
}

export interface ITodoAction extends IAction {
    type: string;
    todo?: Todo;
}

class TodoActionDefaults extends Object implements ITodoAction {
    type: string;
    todo?: Todo;

    constructor() {
        super();
        this.type = '';
        this.todo = new Todo();
    }
}

export class TodoAction extends Object implements ITodoAction {
    type: string;
    todo?: Todo;
    constructor(options?: ITodoAction) {
        options = Object.assign(new TodoActionDefaults(), options);
        super(options);
    }
}
