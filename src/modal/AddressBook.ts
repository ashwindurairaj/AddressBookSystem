import { Contact } from "./ContactPeron";

export class AddressBook {
  private contacts: Contact[] = [];
  private nextId = 1;

  // ... existing methods ...

  deleteContact(firstName: string, lastName: string): boolean {
    const initialLength = this.contacts.length;
    this.contacts = this.contacts.filter(
      contact => !contact.matchesName(firstName, lastName)
    );
    return this.contacts.length !== initialLength;
  }

  // ... rest of the class ...
}