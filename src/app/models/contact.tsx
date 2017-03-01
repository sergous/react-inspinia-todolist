import {IAction} from '~react-redux~redux';
interface IContact extends Object {
    name: string;
    position?: string;
    email?: string;
    phone?: string;
    twitter?: string;
    photo_url?: string;
    company?: string;
    address1?: string;
    address2?: string;
    objectId?: string;
}

class ContactDefaults extends Object implements IContact {
    name: string;
    position: string;
    email: string;
    phone: string;
    twitter: string;
    photo_url: string;
    company: string;
    address1: string;
    address2: string;

    constructor() {
        super();
        this.name = '';
        this.position = '';
        this.email = '';
        this.phone = '';
        this.twitter = '';
        this.photo_url = 'img/profile_small.jpg';
        this.company = '';
        this.address1 = '';
        this.address2 = '';
    }

}

export default class Contact extends Object implements IContact {
    name: string;
    position: string;
    email: string;
    phone: string;
    twitter: string;
    photo_url: string;
    company: string;
    address1: string;
    address2: string;
    objectId: string;

    constructor(options?: IContact) {
        options = Object.assign(new ContactDefaults(), options);
        super(options);
    }
}

export interface IContactAction extends IAction {
    type: string;
    contact?: Contact;
}

class ContactActionDefaults extends Object implements IContactAction {
    type: string;
    contact?: Contact;
    constructor() {
        super();
        this.type = '';
        this.contact = new Contact();
    }
}

export class ContactAction extends Object implements IContactAction {
    type: string;
    contact?: Contact;
    constructor(options?: IContactAction) {
        options = Object.assign(new ContactActionDefaults(), options);
        super(options);
    }
}

export const initialContact: Contact = new Contact({
        name: 'James Bond',
        position: 'Chief Spy Officer',
        email: 'james@mi6.com',
        phone: '8800-JAMES',
        twitter: 'jamesbond',
        photo_url: 'img/a1.jpg',
        company: 'MI6',
        address1: 'London, GB',
        address2: 'Tower Square, 7'
});
