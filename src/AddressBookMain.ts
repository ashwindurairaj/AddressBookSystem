import readlineSync from "readline-sync";
import { AddressBook } from "./Services/AddressBook";
import { Contact } from "./models/ContactPeron";
import { isValidEmail, isValidPhoneNumber, isValidZipCode } from "./Utils/Validator";

class AddressBookMain {
    private addressBook = new AddressBook();

    displayWelcomeMessage(): void {
        console.log("  Welcome to my Address Book Program");
    }

    start(): void {
        this.displayWelcomeMessage();
        const addressBookName = readlineSync.question("\n Enter a name for your Address book: ")
        console.log(`\nAddress Book "${addressBookName}" created successfully!!"`)
        this.addMultipleContactFromConsole();
    }

    private displayAllContacts() : void {
        const allContacts = this.addressBook.getAllContacts()
        console.log("\n All Contacts in Address Book:");
        if(allContacts.length === 0){
            console.log("No contacts found");
        } else {
            allContacts.forEach((contact, index) => {
                console.log(`\n Contact #${index+1}`);
                contact.displayContact()
            })
        }
        
    }
    private addMultipleContactFromConsole(): void {
    //* UC5 - Ability to add multiple person to Address Book
    let continueAdding = true;

    while (continueAdding) {
        const shouldAdd = readlineSync.question("\n Do you want to add a new contact? (y/n): ");
        if (shouldAdd.toLowerCase() !== "y") {
            continueAdding = false;
            break;
        }

        console.log("\n Add the contact details:");
        const firstName = readlineSync.question("Enter First Name: ");
        const lastName = readlineSync.question("Enter Last Name: ");
        const address = readlineSync.question("Enter Address: ");
        const city = readlineSync.question("Enter City: ");
        const state = readlineSync.question("Enter State: ");

         //* Additional implementation - Regex validations for zip, phonenumber and email
        let zip = parseInt(readlineSync.question("Enter new Zip Code: "));
        while(!isValidZipCode(zip)){
            zip = parseInt(readlineSync.question("Invalid zip. Enter a correct zip code : --> "))
        }

        let phoneNumber = parseInt(readlineSync.question("Enter new Phone Number: "));
        while(!isValidPhoneNumber(phoneNumber)) {
            phoneNumber = parseInt(readlineSync.question("Invalid Phone number. Enter a Valid 10 digit Phone number : --> "))
        }
        let email = readlineSync.question("Enter new Email: ");
        while(!isValidEmail(email)){
            email = readlineSync.question("Invalid email. Enter a valid email : --> ")
        }
        
        const contact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
        this.addressBook.addContact(contact);

        //* UC3 - Ability to edit existing contact
        const shouldEdit = readlineSync.question("\nDo you want to edit this contact now? (y/n): ");
        if (shouldEdit.toLowerCase() === "y") {
            this.addressBook.editContactByName(firstName);
        }

        //* UC4 - Ability to delete the contact
        const shouldDelete = readlineSync.question("\nDo you want to delete this contact? (y/n): ");
        if (shouldDelete.toLowerCase() === "y") {
            this.addressBook.deleteContactByName(firstName);
        }
    }
    this.displayAllContacts();
}

}
const app = new AddressBookMain();
app.start();

