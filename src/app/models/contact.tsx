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
        this.photo_url = 'assets/img/profile_small.jpg';
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
