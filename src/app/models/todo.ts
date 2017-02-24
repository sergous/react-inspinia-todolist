interface ITodo extends Object {
    text: string;
    completed?: boolean;
    objectId?: string;
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

    constructor(options?: ITodo) {
        options = Object.assign(new TodoDefaults(), options);
        this.text = options.text;
        this.completed = options.completed;
    }
}
