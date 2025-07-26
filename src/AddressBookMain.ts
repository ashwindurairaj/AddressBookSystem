import readlineSync from "readline-sync";
import { AddressBook } from "./Services/AddressBook";
import { Contact } from "./models/ContactPeron";

class AddressBookMain {
    private addressBook = new AddressBook();

    displayWelcomeMessage(): void {
        console.log(" Welcome to my Address Book Program");
    }

    start(): void {
        this.displayWelcomeMessage();
        this.addContactFromConsole();
    }

    private addContactFromConsole(): void {
        console.log("Add the contact details : ")
        const firstName = readlineSync.question("Enter First Name: ");
        const lastName = readlineSync.question("Enter Last Name: ");
        const address = readlineSync.question("Enter Address: ");
        const city = readlineSync.question("Enter City: ");
        const state = readlineSync.question("Enter State: ");
        const zip = parseInt(readlineSync.question("Enter Zip Code: "));
        const phoneNumber = parseInt(readlineSync.question("Enter Phone Number: "));
        const email = readlineSync.question("Enter Email: ");

        const contact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
        this.addressBook.addContact(contact);

        const shouldEdit = readlineSync.question("Do you want to edit this contact now ? (y/n): ")
        if(shouldEdit.toLowerCase() === "y"){
            this.addressBook.editContactByName(firstName)
            console.log("\n  Contact Updated successfully!\n");
        }

        const shouldDelete = readlineSync.question(" Do you want to delete the contact details? (y/n): ")
        if(shouldDelete.toLowerCase() === "y") {
            this.addressBook.deleteContactByName(firstName)
            console.log("\n  Contact deleted successfully!");
        }
    }
}
const app = new AddressBookMain();
app.start();