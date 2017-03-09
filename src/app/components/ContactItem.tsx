/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
import Contact from '../models/contact';
import EditableTextField from './EditableTextField';
import {IEditableTextField} from './EditableTextField';
import * as classnames from 'classnames';

interface IContactItemProps {
  contact: Contact;
  editContact?: (contact: Contact) => void;
  deleteContact?: (contact: Contact) => void;
}

interface IContactItemState {
  editing: boolean;
}

class ContactItem extends React.Component<IContactItemProps, IContactItemState> {
  static propTypes = {
    contact: React.PropTypes.object.isRequired,
    editContact: React.PropTypes.func.isRequired,
    deleteContact: React.PropTypes.func.isRequired,
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      editing: false
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSaveTextField = this.handleSaveTextField.bind(this);
  }

  handleSaveTextField( textfield: IEditableTextField ) {
    this.props.contact[textfield.name] = textfield.text;
    this.props.editContact(this.props.contact);
    this.setState({editing: false});
  }

  handleSave( contact: Contact ) {
    this.props.contact = contact;
    this.props.editContact(this.props.contact);
  }

  handleDelete() {
    this.props.deleteContact(this.props.contact);
  }

  handleEdit() {
    this.setState({editing: !this.state.editing});
  }

  render() {
    const contact = this.props.contact;

    let element = (
      <div className={
              classnames({
                'editing': this.state.editing,
              }) + ' contact-box center-version'}
           onDoubleClick={this.handleEdit}>
        <div className='ibox-title'>
          <div className='ibox-tools'>
            <a className='btn btn-xs btn-white' onClick={this.handleDelete}>
              <i className='fa fa-trash'/>
            </a>
            <a className={
                classnames({
                  'active': this.state.editing,
                }) + ' btn btn-xs btn-white'}
               onClick={this.handleEdit}>
              <i className='fa fa-pencil'/>
            </a>
          </div>
        </div>
        <a className='no-padding-top'>
          <img alt={contact.name} className='img-circle' src={contact.photo_url} />
          {contact.name && <h3 className='m-b-xs'>
            <EditableTextField
              text={contact.name}
              name='name'
              editing={this.state.editing}
              onSave={this.handleSaveTextField}
            />
          </h3>}
          {contact.position && <div className='font-bold'>
            <EditableTextField
              text={contact.position}
              name='position'
              editing={this.state.editing}
              onSave={this.handleSaveTextField}
            />
          </div>}
          <address className='m-t-md'>
            {contact.company && <strong>
              <EditableTextField
                text={contact.company}
                name='company'
                editing={this.state.editing}
                onSave={this.handleSaveTextField}
              />
            </strong>}
            {contact.address1 && <p className='no-margins'>
              <EditableTextField
                text={contact.address1}
                name='address1'
                editing={this.state.editing}
                onSave={this.handleSaveTextField}
              />
            </p>}
            {contact.address2 && <p className='no-margins'>
              <EditableTextField
                text={contact.address2}
                name='address2'
                editing={this.state.editing}
                onSave={this.handleSaveTextField}
              />
            </p>}
            {contact.phone && <p className='no-margins'>
              <abbr title='Phone'>P: </abbr><span>
              <EditableTextField
                text={contact.phone}
                name='phone'
                editing={this.state.editing}
                onSave={this.handleSaveTextField}
              />
            </span></p>}
          </address>
        </a>
        <div className='contact-box-footer'>
          <div className='m-t-xs btn-group'>
            {contact.phone && <a className='btn btn-xs btn-white' href={`tel:${contact.phone}`}>
              <i className='fa fa-phone'></i> Call </a>}
            {contact.email && <a className='btn btn-xs btn-white' href={`mailto:${contact.email}`}>
              <i className='fa fa-envelope'></i> Email</a>}
            {contact.twitter && <a className='btn btn-xs btn-white' href={`http://twitter.com/${contact.twitter}`}>
              <i className='fa fa-user-plus'></i> Follow</a>}
          </div>
        </div>
      </div>
    );

    return (
      <div className='col-md-6' key={contact.objectId}>
        {element}
      </div>
    );
  }
}

export default ContactItem;
