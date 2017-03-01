/// <reference path='../../../../typings/index.d.ts' />

import * as React from 'react';
import Contact from '../../models/contact';
import ContactService from '../../services/contact.service';
import ContactItem from '../ContactItem';

interface IContactsViewProps {
  contacts: Contact[];
  actions: any;
};
interface IContactsViewState {}

class ContactsView extends React.Component<IContactsViewProps, IContactsViewState> {
    render() {
        const {actions} = this.props;
        const contacts: Contact[] = ContactService.getContacts();
        return (
            <div className='wrapper wrapper-content animated fadeInRight'>
                <div className='row'>
                    {contacts.map(contact =>
                        <ContactItem
                          key={contact.objectId}
                          contact={contact}
                          {...actions}
                        />
                    )}
                </div>
            </div>
        );
    }

}

export default ContactsView;
