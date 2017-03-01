/// <reference path="../../../typings/index.d.ts" />

import * as types from '../constants/ActionTypes';
import Todo from '../models/todo';
import Contact from '../models/contact';

export function addTodo( todo: Todo ) {
  return {type: types.ADD_TODO, todo};
}

export function deleteTodo( todo: Todo ) {
  return {type: types.DELETE_TODO, todo};
}

export function editTodo( todo: Todo ) {
  return {type: types.EDIT_TODO, todo};
}

export function completeTodo( todo: Todo ) {
  return {type: types.COMPLETE_TODO, todo};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}

export function addContact( contact: Contact ) {
  return {type: types.ADD_CONTACT, contact};
}

export function deleteContact( contact: Contact ) {
  return {type: types.DELETE_CONTACT, contact};
}

export function editContact( contact: Contact ) {
  return {type: types.EDIT_CONTACT, contact};
}
