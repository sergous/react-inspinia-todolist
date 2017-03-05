import contacts from './contacts';
import * as types from '../constants/ActionTypes';
import {ContactAction} from '../models/contact';
import Contact from '../models/contact';
import ContactService from '../services/contact.service';

let setup = new class {
  public contacts = [];
  public contactsStore = [];
  constructor() {
    let initState = contacts();

    this.contacts.push( initState[0] );
    this.contacts.push( ContactService.saveContact( new Contact({name: 'Kerry Nice'}) ));
    this.contacts.push( ContactService.saveContact( new Contact({name: 'Tommy Big'}) ));
    this.contacts.push( ContactService.saveContact( new Contact({name: 'Lucy Fox'}) ));

    this.contactsStore.push(initState);
    this.contactsStore.push(contacts([
      this.contacts[1],
    ]));
    this.contactsStore.push(contacts([
      this.contacts[1],
    ], new ContactAction({
      type: types.ADD_CONTACT,
      contact: this.contacts[2]
    })));
    this.contactsStore.push(contacts([
      this.contacts[1],
      this.contacts[2]
    ], new ContactAction({
      type: types.ADD_CONTACT,
      contact: this.contacts[3]
    })));
  };
};

describe('contacts reducer', () => {
  it('should handle initial state', () => {
    expect(
      setup.contactsStore[0][0]
    ).toEqual(setup.contacts[0]);
  });

  it('should handle ADD_CONTACT', () => {
    expect(
      setup.contactsStore[1][0]
    ).toEqual(setup.contacts[1]);

    expect(
      setup.contactsStore[2][0]
    ).toEqual(setup.contacts[2]);

    expect(
      setup.contactsStore[2][0].name
    ).toEqual(setup.contacts[2].name);

    expect(
      setup.contactsStore[3][0]
    ).toEqual(setup.contacts[3]);

    expect(
      setup.contactsStore[3][0].name
    ).toEqual(setup.contacts[3].name);
  });

  it('should handle DELETE_CONTACT', () => {
    expect(
      contacts([
        setup.contacts[1],
        setup.contacts[2]
      ], new ContactAction({
        type: types.DELETE_CONTACT,
        contact: setup.contacts[2]
      }))
    ).toEqual(setup.contactsStore[1]);
  });

  it('should handle EDIT_CONTACT', () => {
    let updatedContact1 = new Contact( Object.assign({}, setup.contacts[1], {name: 'Updated Name'}) );
    expect(
      contacts([
        setup.contacts[0],
        setup.contacts[1]
      ], new ContactAction({
        type: types.EDIT_CONTACT,
        contact: updatedContact1
      }))
    ).toEqual(
      contacts([
        setup.contacts[0],
        updatedContact1
      ])
    );
  });

  it('should not generate duplicate ids after DELETE_CONTACT', () => {
    expect(
      [
        {
          type: types.ADD_CONTACT,
          contact: setup.contacts[0]
        }, {
          type: types.DELETE_CONTACT,
          contact: setup.contacts[0]
        }, {
          type: types.ADD_CONTACT,
          contact: setup.contacts[1]
        }
      ].reduce(contacts, [
        setup.contacts[0],
        setup.contacts[2]
      ])
    ).toEqual([
        setup.contacts[1],
        setup.contacts[2]
    ]);
  });
});
