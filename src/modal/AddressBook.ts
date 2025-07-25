import { Contact, IContactData } from "./ContactPeron";

export class AddressBook {
    private contacts: Contact[] = [];
    private nextId = 1;

    addContact(contactData: IContactData): Contact {
        const newContact = new Contact(
            (this.nextId++).toString(),
            contactData.firstName,
            contactData.lastName,
            contactData.address,
            contactData.city,
            contactData.state,
            contactData.zip,
            contactData.phone,
            contactData.email
        );

        if (this.isDuplicateByName(newContact)) {
            throw new Error(`Contact '${newContact.firstName} ${newContact.lastName}' already exists`);
        }

        if (this.isDuplicateByPhoneOrEmail(newContact)) {
            throw new Error("Contact with same phone or email already exists");
        }

        this.contacts.push(newContact);
        return newContact;
    }

    private isDuplicateByName(contact: Contact): boolean {
        return this.contacts.some(c => c.equals(contact));
    }

    private isDuplicateByPhoneOrEmail(contact: Contact): boolean {
        return this.contacts.some(c => 
            c.phone === contact.phone || 
            c.email === contact.email
        );
    }

    searchByCity(city: string): Contact[] {
        return this.contacts.filter(contact => contact.isFromCity(city));
    }

    searchByState(state: string): Contact[] {
        return this.contacts.filter(contact => contact.isFromState(state));
    }

    getAllContacts(): Contact[] {
        return [...this.contacts];
    }

    displayContacts(): void {
        if (this.contacts.length === 0) {
            console.log("No contacts found");
            return;
        }
        console.log("\nContacts:");
        this.contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.toString()}\n`);
        });
    }
}