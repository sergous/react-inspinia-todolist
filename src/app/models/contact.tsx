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

class ContactDefaults implements IContact {
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
        this.name = '';
        this.position = '';
        this.email = '';
        this.phone = '';
        this.twitter = '';
        this.photo_url = 'assets/img/a1.jpg';
        this.company = '';
        this.address1 = '';
        this.address2 = '';
    }

}

export default class Contact implements IContact {
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

    constructor(options: IContact = new ContactDefaults()) {
        this.name = options.name;
        this.position = options.position;
        this.email = options.email;
        this.phone = options.phone;
        this.twitter = options.twitter;
        this.photo_url = options.photo_url;
        this.company = options.company;
        this.address1 = options.address1;
        this.address2 = options.address2;
    }
}
