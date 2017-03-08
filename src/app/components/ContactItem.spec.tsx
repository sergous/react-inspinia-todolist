import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import ContactItem from './ContactItem';
import Contact from '../models/contact';
import {initialContact as contact} from '../models/contact';

function setup(editing: boolean = false) {
  const props = {
    contact: contact,
    // todo: edit form
    editContact: jasmine.createSpy('editContact'),
    deleteContact: jasmine.createSpy('deleteContact'),
  };

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <ContactItem {...props}/>
  );

  let output = renderer.getRenderOutput();

  // todo: add editing
  // if (editing) {
  //   const label = output.props.children.props.children[1];
  //   label.props.onDoubleClick({});
  //   output = renderer.getRenderOutput();
  // }

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('ContactItem', () => {
    it('initial render', () => {
      const {output} = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('col-md-6');

      const contactBox = output.props.children;

      expect(contactBox.type).toBe('div');
      expect(contactBox.props.className).toContain('contact-box');
      expect(contactBox.props.className).toContain('center-version');

      const [a, footer] = contactBox.props.children;

      expect(a.type).toBe('a');

      const [photo, name, position, address] = a.props.children;

      expect(photo.type).toBe('img');
      expect(photo.props.alt).toBe(contact.name);
      expect(photo.props.src).toBe(contact.photo_url);
      expect(photo.props.className).toBe('img-circle');

      expect(name.type).toBe('h3');
      expect(name.props.className).toBe('m-b-xs');

      const editableName = name.props.children;
      expect(editableName.props.name).toBe('name');
      expect(editableName.props.text).toBe(contact.name);

      expect(position.type).toBe('div');
      expect(position.props.className).toBe('font-bold');

      const editablePosition = position.props.children;
      expect(editablePosition.props.name).toBe('position');
      expect(editablePosition.props.text).toBe(contact.position);

      expect(address.type).toBe('address');
      expect(address.props.className).toBe('m-t-md');

      const [company, address1, address2, phone] = address.props.children;

      expect(company.type).toBe('strong');

      const editableCompany = company.props.children;
      expect(editableCompany.props.name).toBe('company');
      expect(editableCompany.props.text).toBe(contact.company);

      expect(address1.type).toBe('p');
      expect(address1.props.className).toBe('no-margins');

      const editableAddress1 = address1.props.children;
      expect(editableAddress1.props.name).toBe('address1');
      expect(editableAddress1.props.text).toBe(contact.address1);

      expect(address2.type).toBe('p');
      expect(address2.props.className).toBe('no-margins');

      const editableAddress2 = address2.props.children;
      expect(editableAddress2.props.name).toBe('address2');
      expect(editableAddress2.props.text).toBe(contact.address2);

      expect(phone.type).toBe('p');
      expect(phone.props.className).toBe('no-margins');

      const [phoneAbbr, phoneNum] = phone.props.children;

      expect(phoneAbbr.type).toBe('abbr');
      expect(phoneAbbr.props.title).toBe('Phone');
      expect(phoneNum.type).toBe('span');

      const editablePhoneNum = phoneNum.props.children;
      expect(editablePhoneNum.props.name).toBe('phone');
      expect(editablePhoneNum.props.text).toBe(contact.phone);

      // Footer
      expect(footer.type).toBe('div');
      expect(footer.props.className).toBe('contact-box-footer');

      const btnGroup = footer.props.children;
      expect(btnGroup.type).toBe('div');
      expect(btnGroup.props.className).toContain('m-t-xs');
      expect(btnGroup.props.className).toContain('btn-group');

      const buttons = [].slice.call(btnGroup.props.children);
      buttons.forEach(button => {
        expect(button.type).toBe('a');
        expect(button.props.className).toBe('btn btn-xs btn-white');
      });

      const [phoneButton, emailButton, twitterButton] = buttons;
      expect(phoneButton.props.href).toBe(`tel:${contact.phone}`);
      expect(emailButton.props.href).toBe(`mailto:${contact.email}`);
      expect(twitterButton.props.href).toBe(`http://twitter.com/${contact.twitter}`);

      const [phoneButtonIcon, phoneButtonName] = phoneButton.props.children;
      expect(phoneButtonIcon.type).toBe('i');
      expect(phoneButtonIcon.props.className).toContain('fa-phone');
      expect(phoneButtonName).toContain('Call');

      const [emailButtonIcon, emailButtonName] = emailButton.props.children;
      expect(emailButtonIcon.type).toBe('i');
      expect(emailButtonIcon.props.className).toContain('fa-envelop');
      expect(emailButtonName).toContain('Email');

      const [twitterButtonIcon, twitterButtonName] = twitterButton.props.children;
      expect(twitterButtonIcon.type).toBe('i');
      expect(twitterButtonIcon.props.className).toContain('fa-user-plus');
      expect(twitterButtonName).toContain('Follow');

    });

    xit('button onClick should call deleteContact', () => {
      const {output, props} = setup();
      const button = output.props.children.props.children[2];
      button.props.onClick({});
      // expect(props.deleteContact).toHaveBeenCalledWith(props.contact);
    });

    xit('label onDoubleClick should put component in edit state', () => {
      const {output, renderer} = setup();
      const label = output.props.children.props.children[1];
      label.props.onDoubleClick({});
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('editing');
    });
  });

  xdescribe('ContactItem', () => {
    it('edit state render', () => {
      const {output} = setup(true);

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('editing');

      const input = output.props.children;
      // todo: add contact edit form
      // expect(input.type).toBe(ContactTextInput);
      expect(input.props.name).toBe(contact.name);
      expect(input.props.editing).toBe(true);
    });

    it('ContactTextInput onSave should call editContact', () => {
      const {output, props} = setup(true);
      output.props.children.props.onSave(new Contact({name: 'Updated Name'}));
      // expect(props.editContact).toHaveBeenCalledWith(props.contact);
    });

    it('ContactTextInput onSave should call deleteContact if text is empty', () => {
      const {output, props} = setup(true);
      output.props.children.props.onSave('');
      // expect(props.deleteContact).toHaveBeenCalledWith(props.contact);
    });

    it('ContactTextInput onSave should exit component from edit state', () => {
      const {output, renderer} = setup(true);
      output.props.children.props.onSave(contact.name);
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('');
    });
  });
});
