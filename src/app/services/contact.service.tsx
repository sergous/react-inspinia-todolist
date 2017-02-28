import * as Backendless from 'backendless';
import {Env} from '../constants/Env';
import guid from '../utils/guid';
import Contact from '../models/contact';

class ContactService {
  constructor() {
    Backendless.initApp(Env.APP_ID, Env.APP_KEY, Env.APP_VER);
  }
  saveContact(contact: Contact): Contact {
    if (Env.CURRENT === Env.TEST) {
      try {
        contact.objectId = contact.objectId || guid();
        return contact;
      } catch (e) {
        console.log(e);
      }
    }
    try {
      //noinspection TypeScriptValidateTypes
      return Backendless.Persistence.of(Contact).save(contact);
    } catch (error) {
      console.log(error);
    }
  }
  removeContact(contact: Contact): Object {
    if (Env.CURRENT === Env.TEST) {
      return {};
    }
    try {
      return Backendless.Persistence.of(Contact).remove(contact);
    } catch (error) {
      console.log(error);
    }
  }
  getContacts(): Contact[] {
    if (Env.CURRENT === Env.TEST) {
      return [];
    }
    try {
      let result = Backendless.Persistence.of(Contact).find();
      // noinspection TypeScriptUnresolvedVariable
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ContactService();
