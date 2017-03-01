import {ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT} from '../constants/ActionTypes';
import {assign} from '../assign';
import Contact from '../models/contact';
import ContactService from '../services/contact.service';
import {ContactAction} from '../models/contact';
import {initialContact} from '../models/contact';

let initContacts: Contact[] = ContactService.getContacts();
const initialState = initContacts.length > 0 ? initContacts : [ContactService.saveContact(initialContact)];

export default function contacts(state?: Contact[], action?: any): Contact[] {
  state = state || initialState;
  action = action || new ContactAction();
  switch (action.type) {
    case ADD_CONTACT:
      return [
        ContactService.saveContact( action.contact ),
        ...state
      ];

    case DELETE_CONTACT:
      if (!ContactService.removeContact(action.contact)) { return; }
      return state.filter(contact =>
        contact.objectId !== action.contact.objectId
      );

    case EDIT_CONTACT:
      return state.map(contact =>
        contact.objectId === action.contact.objectId ?
            ContactService.saveContact( assign({}, contact, {text: action.contact.text}) ) :
          contact
      );

    default:
      return state;
  }
}
