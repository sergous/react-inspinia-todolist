import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import ContactItem from './ContactItem';
import {initialContact as contact} from '../models/contact';
import EditableTextField from './EditableTextField';

function setup(editing: boolean = false) {
  const props = {
    contact: contact,
    editContact: jasmine.createSpy('editContact'),
    deleteContact: jasmine.createSpy('deleteContact'),
  };

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <ContactItem {...props}/>
  );

  let output = renderer.getRenderOutput();

  const [trashButton, editButton] = output.props.children.props.children[0].props.children.props.children;

  if (editing) {
    editButton.props.onClick({});
    output = renderer.getRenderOutput();
  }

  const nameTextField = output.props.children.props.children[1].props.children[1].props.children;

  return {
    props,
    output,
    renderer,
    trashButton,
    editButton,
    nameTextField
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

      const [iboxTitle, a, footer] = contactBox.props.children;
      expect(iboxTitle.type).toBe('div');
      expect(iboxTitle.props.className).toBe('ibox-title');

      const iboxTools = iboxTitle.props.children;
      expect(iboxTools.type).toBe('div');
      expect(iboxTools.props.className).toBe('ibox-tools');

      const [trashButton, pencilButton] = iboxTools.props.children;
      expect(trashButton.type).toBe('a');
      expect(trashButton.props.className).toContain('btn-white');

      const trashIcon = trashButton.props.children;
      expect(trashIcon.type).toBe('i');
      expect(trashIcon.props.className).toContain('fa-trash');

      expect(pencilButton.type).toBe('a');
      expect(pencilButton.props.className).toContain('btn-white');

      const pencilIcon = pencilButton.props.children;
      expect(pencilIcon.type).toBe('i');
      expect(pencilIcon.props.className).toContain('fa-pencil');

      expect(a.type).toBe('a');

      const [photo, name, position, address] = a.props.children;

      expect(photo.type).toBe('img');
      expect(photo.props.alt).toBe(contact.name);
      expect(photo.props.src).toBe(contact.photo_url);
      expect(photo.props.className).toBe('img-circle');

      expect(name.type).toBe('h3');
      expect(name.props.className).toBe('m-b-xs');

      const editableName = name.props.children;
      expect(editableName.type).toBe(EditableTextField);
      expect(editableName.props.name).toBe('name');
      expect(editableName.props.text).toBe(contact.name);

      expect(position.type).toBe('div');
      expect(position.props.className).toBe('font-bold');

      const editablePosition = position.props.children;
      expect(editablePosition.type).toBe(EditableTextField);
      expect(editablePosition.props.name).toBe('position');
      expect(editablePosition.props.text).toBe(contact.position);

      expect(address.type).toBe('address');
      expect(address.props.className).toBe('m-t-md');

      const [company, address1, address2, phone] = address.props.children;

      expect(company.type).toBe('strong');

      const editableCompany = company.props.children;
      expect(editableCompany.type).toBe(EditableTextField);
      expect(editableCompany.props.name).toBe('company');
      expect(editableCompany.props.text).toBe(contact.company);

      expect(address1.type).toBe('p');
      expect(address1.props.className).toBe('no-margins');

      const editableAddress1 = address1.props.children;
      expect(editableAddress1.type).toBe(EditableTextField);
      expect(editableAddress1.props.name).toBe('address1');
      expect(editableAddress1.props.text).toBe(contact.address1);

      expect(address2.type).toBe('p');
      expect(address2.props.className).toBe('no-margins');

      const editableAddress2 = address2.props.children;
      expect(editableAddress2.type).toBe(EditableTextField);
      expect(editableAddress2.props.name).toBe('address2');
      expect(editableAddress2.props.text).toBe(contact.address2);

      expect(phone.type).toBe('p');
      expect(phone.props.className).toBe('no-margins');

      const [phoneAbbr, phoneNum] = phone.props.children;

      expect(phoneAbbr.type).toBe('abbr');
      expect(phoneAbbr.props.title).toBe('Phone');
      expect(phoneNum.type).toBe('span');

      const editablePhoneNum = phoneNum.props.children;
      expect(editablePhoneNum.type).toBe(EditableTextField);
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

    it('trash button onClick should call deleteContact', () => {
      const {props, trashButton} = setup();
      trashButton.props.onClick({});

      expect(props.deleteContact).toHaveBeenCalledWith(props.contact);
    });

    it('edit pencil button onClick should put component in edit state', () => {
      const {renderer, editButton} = setup();
      editButton.props.onClick({});
      const updated = renderer.getRenderOutput();
      const nameTextField = updated.props.children.props.children[1].props.children[1].props.children;

      expect(nameTextField.type).toBe(EditableTextField);
      expect(nameTextField.props.name).toBe('name');
      expect(nameTextField.props.editing).toBe(true);
      expect(nameTextField.props.text).toBe(contact.name);
    });
  });

  describe('ContactItem', () => {
    it('edit state render', () => {
      const {output, nameTextField} = setup(true);

      expect(output.type).toBe('div');
      expect(output.props.children.props.className).toContain('editing');
      expect(nameTextField.type).toBe(EditableTextField);
      expect(nameTextField.props.name).toBe('name');
      expect(nameTextField.props.text).toBe(contact.name);
      expect(nameTextField.props.editing).toBe(true);
    });

    it('EditableTextField onSave should call editContact', () => {
      const {props, nameTextField} = setup(true);
      nameTextField.props.onSave({name: 'name', text: 'Updated Name'});

      expect(props.editContact).toHaveBeenCalledWith(props.contact);
    });

    it('EditableTextField onSave should exit component from edit state', () => {
      const {renderer, editButton} = setup(true);
      editButton.props.onClick({});
      const updated = renderer.getRenderOutput();
      const div = updated.props.children;

      expect(div.props.className).not.toBe('editing');
    });

    it('EditableTextField onSave should hide field if text is empty', () => {
      const {renderer, nameTextField} = setup(true);
      nameTextField.props.onSave({name: 'name',  text: ''});
      const updated = renderer.getRenderOutput();
      const h3 = updated.props.children.props.children[1].props.children[1];

      expect(h3).toBe('');
    });
  });
});
