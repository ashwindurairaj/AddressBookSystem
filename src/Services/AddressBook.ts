import { Contact } from "../models/ContactPeron"
export class AddressBook {
    private contacts : Contact[] = []
    addContact(contact : Contact) : void {
        this.contacts.push(contact)
        console.log("\n  Contact added successfully!\n");
        contact.displayContact()
    } 
    getAllContacts() : Contact[] {
        return this.contacts
    }
}