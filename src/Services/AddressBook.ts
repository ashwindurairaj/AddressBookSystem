import readlineSync from "readline-sync";
import { Contact } from "../models/ContactPeron"
export class AddressBook {
    private contacts : Contact[] = []
    //* UC2 : Ability to add a new Contact to Address Book
    addContact(contact : Contact) : void {
        this.contacts.push(contact)
        console.log("\n  Contact added successfully!\n");
        contact.displayContact()
    } 
    getAllContacts() : Contact[] {
        return this.contacts
    }
    //* UC3: Ability to edit an existing contact using their name via console input. 
    editContactByName(firstName: string) : boolean {
        const contact = this.contacts.find(c => c.firstName.toLowerCase() === firstName.toLowerCase())
        if(!contact){
            console.log(` Contact with name "${firstName}" not found.`);
            return false;
        }
       console.log(`\n Editing contact for: ${contact.firstName} ${contact.lastName}`);
        contact.lastName = readlineSync.question("Enter new Last Name: ");
        contact.address = readlineSync.question("Enter new Address: ");
        contact.city = readlineSync.question("Enter new City: ");
        contact.state = readlineSync.question("Enter new State: ");
        contact.zip = parseInt(readlineSync.question("Enter new Zip Code: "));
        contact.phoneNumber = parseInt(readlineSync.question("Enter new Phone Number: "));
        contact.email = readlineSync.question("Enter new Email: ");
        console.log("\n Contact updated successfully!");
        contact.displayContact();
        return true;
    }
    //* UC4 : Ability to delete the person using a person name

    deleteContactByName(firstName : string ) : boolean {
        const index = this.contacts.findIndex(
            (c) => c.firstName.toLowerCase() === firstName.toLowerCase()
        )
        if(index == -1 ) {
            console.log("The contact detail is not found");
        }
        const removed = this.contacts.splice(index, 1)[0];
        console.log(`\n Contact "${removed.firstName} ${removed.lastName}" deleted successfully!\n`);
        return true
    }
 }