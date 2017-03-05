/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
import Contact from '../models/contact';

interface IContactItemProps {
  contact: Contact;
  // todo: edit contact
  editContact?: (contact: Contact) => void;
  deleteContact?: (contact: Contact) => void;
  completeContact?: (contact: Contact) => void;
}

interface IContactItemState {
  editing: boolean;
}

class ContactItem extends React.Component<IContactItemProps, IContactItemState> {
  static propTypes = {
    contact: React.PropTypes.object.isRequired,
    // todo: add actions
    // editContact: React.PropTypes.func.isRequired,
    // deleteContact: React.PropTypes.func.isRequired,
    // completeContact: React.PropTypes.func.isRequired
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange() {
    this.props.completeContact(this.props.contact);
  }

  handleClick() {
    this.props.deleteContact(this.props.contact);
  }

  handleDoubleClick() {
    this.setState({editing: true});
  }

  handleSave( contact: Contact ) {
    if (!contact.name || contact.name.length === 0) {
      this.props.deleteContact(this.props.contact);
    } else {
      this.props.contact.name = contact.name;
      this.props.editContact(this.props.contact);
    }
    this.setState({editing: false});
  }

  render() {
    const contact = this.props.contact;

    let element;
    if (this.state.editing) {
      // todo: contact edit form
      /*element = (
        <ContactTextInput
          name={contact.name}
          editing={this.state.editing}
          onSave={this.handleSave}
          />
      );*/
    } else {
      element = (
        <div className='contact-box center-version'>
          <a href=''>
            <img alt={contact.name} className='img-circle' src={contact.photo_url} />
            <h3 className='m-b-xs'>{contact.name}</h3>
            {contact.position && <div className='font-bold'>{contact.position}</div>}
            <address className='m-t-md'>
              {contact.company && <strong>{contact.company}</strong>}
              {contact.address1 && <p className='no-margins'>{contact.address1}</p>}
              {contact.address2 && <p className='no-margins'>{contact.address2}</p>}
              {contact.phone && <p className='no-margins'>
                <abbr title='Phone'>P: </abbr><span>{contact.phone}</span></p>}
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
    }

    return (
      <div className='col-md-6' key={contact.objectId}>
        {element}
      </div>
    );
  }
}

export default ContactItem;
