import ContactService from './contact.service';
import Contact from '../models/contact';

describe('ContactService', () => {
  let contacts = ContactService.getContacts();
  it('should get empty contacts', () => {
    expect(
      contacts.length
    ).toEqual(0);
  });
  let contact = ContactService.saveContact(new Contact({name: 'Name Lastname'}));
  it('should save contact', () => {
    expect(
      contact.objectId
    ).toBeDefined();
  });
  it('should remove contact', () => {
    expect(
      ContactService.removeContact(contact) instanceof Object
    ).toBeTruthy();
  });
});
