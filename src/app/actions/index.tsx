/// <reference path="../../../typings/index.d.ts" />

import * as types from '../constants/ActionTypes';

export function addTodo(text: string) {
  return {type: types.ADD_TODO, text};
}

export function deleteTodo(objectId: string) {
  return {type: types.DELETE_TODO, objectId};
}

export function editTodo(objectId: string, text: string) {
  return {type: types.EDIT_TODO, objectId, text};
}

export function completeTodo(objectId: string) {
  return {type: types.COMPLETE_TODO, objectId};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}
