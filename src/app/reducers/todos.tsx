
import * as Backendless from 'backendless';
import {ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED} from '../constants/ActionTypes';
import {assign} from '../assign';
import Todo from '../models/todo';


const APP_ID = 'B6827009-0DB1-84F3-FF46-4977EAB2F000';
const APP_KEY = 'E7DF33A5-965F-1BD3-FF7F-78A26737F200';
const APP_VER = 'v1';

Backendless.initApp(APP_ID, APP_KEY, APP_VER);

function getTodos(): Todo[] {
  try {
    let result = Backendless.Persistence.of( Todo ).find( );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

function saveTodo(todo: Todo): Object {
  try {
    return Backendless.Persistence.of( Todo ).save( todo );
  } catch (error) {
    console.log(error);
  }
}

function removeTodo(todo: Todo): Object {
  try {
    return Backendless.Persistence.of( Todo ).remove( todo );
  } catch (error) {
    console.log(error);
  }
}

const initialState = getTodos() || [saveTodo( new Todo({text: 'Use Redux'}) )];

export default function  todos(state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_TODO:
      return [
        saveTodo( new Todo({ text: action.text }) ),
        ...state
      ];

    case DELETE_TODO:
      if (!removeTodo(action)) { return; }
      return state.filter(todo =>
        todo.objectId !== action.objectId
      );

    case EDIT_TODO:
      return state.map(todo =>
        todo.objectId === action.objectId ?
          saveTodo( assign({}, todo, {text: action.text}) ) :
          todo
      );

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.objectId === action.objectId ?
          saveTodo( assign({}, todo, {completed: !action.completed}) ) :
          todo
      );

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => {
        return saveTodo(assign({}, todo, {
          completed: !areAllMarked
        }));
      });

    case CLEAR_COMPLETED:
      return state.filter(todo => {
        return !(todo.completed && removeTodo(todo));
      });

    default:
      return state;
  }
}
