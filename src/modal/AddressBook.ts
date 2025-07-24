import { Contact, IContactData } from "./ContactPeron";

export class AddressBook {
    private contacts: Contact[] = [];
    private nextId = 1;

    addContact(contactData: IContactData): Contact {
        const contact = new Contact(
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

        if (this.isDuplicate(contact)) {
            throw new Error("Contact with same phone/email exists");
        }

        this.contacts.push(contact);
        return contact;
    }

    addMultipleContacts(contactsData: IContactData[]): {success: Contact[], errors: string[]} {
        const results = {
            success: [] as Contact[],
            errors: [] as string[]
        };

        contactsData.forEach(data => {
            try {
                results.success.push(this.addContact(data));
            } catch (error) {
                results.errors.push(error instanceof Error ? error.message : "Invalid contact");
            }
        });

        return results;
    }

    private isDuplicate(contact: Contact): boolean {
        return this.contacts.some(c => 
            c.phone === contact.phone || 
            c.email === contact.email
        );
    }

    getAllContacts(): Contact[] {
        return [...this.contacts];
    }
}