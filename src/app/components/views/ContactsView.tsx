/// <reference path='../../../../typings/index.d.ts' />

import * as React from 'react';
import Contact from '../../models/contact';
import ContactItem from '../ContactItem';
import {IDispatch} from '~react-redux~redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addContact, deleteContact, editContact} from '../../actions/index';
import AddNewItem from '../../AddNewItem';

interface IContactsViewProps {
  contacts?: Contact[];
  actions?: any;
}

interface IContactsViewState {
  contacts: Contact[];
}

class ContactsView extends React.Component<IContactsViewProps, IContactsViewState> {
    static propTypes = {
      contacts: React.PropTypes.array.isRequired,
      actions: React.PropTypes.object.isRequired
    };

    constructor(props: any, context: any) {
      super(props, context);
      this.state = {
        contacts: this.props.contacts
      };
      this.handleAddNew = this.handleAddNew.bind(this);
    }

    handleAddNew() {
      this.props.actions.addContact(new Contact());
    }

    render() {
        const {contacts, actions} = this.props;
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
                    <div className='col-md-6'>
                      <AddNewItem
                        className='contact-box center-version'
                        addNew={this.handleAddNew}
                      />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
  return {
    contacts: state.contacts
  };
}

function mapDispatchToProps(dispatch: IDispatch) {
  //noinspection TypeScriptValidateTypes
  return {
    actions: bindActionCreators({
      addContact,
      deleteContact,
      editContact
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsView);
