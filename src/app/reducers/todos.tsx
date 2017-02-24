import {ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED} from '../constants/ActionTypes';
import {assign} from '../assign';
import Todo from '../models/todo';
import TodoService from '../services/todo.service';


const initialState = TodoService.getTodos() || [TodoService.saveTodo( new Todo({text: 'Use Redux'}) )];

export default function  todos(state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_TODO:
      return [
        TodoService.saveTodo( new Todo({ text: action.text }) ),
        ...state
      ];

    case DELETE_TODO:
      if (!TodoService.removeTodo(action)) { return; }
      return state.filter(todo =>
        todo.objectId !== action.objectId
      );

    case EDIT_TODO:
      return state.map(todo =>
        todo.objectId === action.objectId ?
            TodoService.saveTodo( assign({}, todo, {text: action.text}) ) :
          todo
      );

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.objectId === action.objectId ?
            TodoService.saveTodo( assign({}, todo, {completed: !action.completed}) ) :
          todo
      );

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => {
        return TodoService.saveTodo(assign({}, todo, {
          completed: !areAllMarked
        }));
      });

    case CLEAR_COMPLETED:
      return state.filter(todo => {
        return !(todo.completed && TodoService.removeTodo(todo));
      });

    default:
      return state;
  }
}
