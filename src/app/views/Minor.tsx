/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
import * as Backendless from 'backendless';
import Contact from '../models/contact';

interface IMinorViewProps {}
interface IMinorViewState {}

class Minor extends React.Component<IMinorViewProps, IMinorViewState> {

    saveContact(contact: Contact) {
        try {
            return Backendless.Persistence.of( Contact ).save( contact );
        } catch (error) {
            console.log(error);
        }
    }

    getContacts(): Contact[] {
        try {
            let result = Backendless.Persistence.of( Contact ).find( );
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const APP_ID = 'B6827009-0DB1-84F3-FF46-4977EAB2F000';
        const APP_KEY = 'E7DF33A5-965F-1BD3-FF7F-78A26737F200';
        const APP_VER = 'v1';

        Backendless.initApp(APP_ID, APP_KEY, APP_VER);

        let contacts: Contact[] = this.getContacts();
        return (
            <div className='wrapper wrapper-content animated fadeInRight'>
                <div className='row'>
                    {contacts.map(contact =>
                        <div className='col-md-6' key={contact.objectId}>
                            <div className='contact-box center-version'>

                                <a href='profile.html'>

                                    <img alt='image' className='img-circle' src='img/profile_small.jpg' />


                                    <h3 className='m-b-xs'><strong>{ contact.name }</strong></h3>

                                    <div className='font-bold'>{ contact.position }</div>
                                    <address className='m-t-md'>
                                        <strong>{ contact.company }</strong><br/>
                                        { contact.address1 }<br/>
                                        { contact.address2 }<br/>
                                        <span><abbr title='Phone'>P:</abbr> { contact.phone }</span><br/>
                                    </address>

                                </a>
                                <div className='contact-box-footer'>
                                    <div className='m-t-xs btn-group'>
                                        <a className='btn btn-xs btn-white' href={ `tel:${contact.phone}` }><i className='fa fa-phone'></i> Call </a>
                                        <a className='btn btn-xs btn-white' href={ `mailto:${contact.email}` }><i className='fa fa-envelope'></i> Email</a>
                                        <a className='btn btn-xs btn-white' href={ `http://twitter.com/${contact.twitter}` }><i className='fa fa-user-plus'></i> Follow</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}

export default Minor;
