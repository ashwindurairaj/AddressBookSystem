import * as readline from "readline-sync";
import { AddressBook } from "./modal/AddressBook";
import { IContactData } from "./modal/ContactPeron";

class AddressBookApp {
    private addressBook = new AddressBook();

    private showMenu(): void {
        console.log("\n==== Address Book ====");
        console.log("1. Add Single Contact");
        console.log("2. Add Multiple Contacts");
        console.log("3. View All Contacts");
        console.log("4. Exit");
    }

    private getContactDetails(): IContactData {
        console.log("\nEnter Contact Details:");
        return {
            firstName: readline.question("First Name: "),
            lastName: readline.question("Last Name: "),
            address: readline.question("Address: "),
            city: readline.question("City: "),
            state: readline.question("State: "),
            zip: readline.question("Zip Code (6 digits): "),
            phone: readline.question("Phone (+91XXXXXXXXXX): "),
            email: readline.question("Email: ")
        };
    }

    private addMultipleContactsFlow(): void {
        const contacts: IContactData[] = [];
        let addMore = true;

        while (addMore) {
            console.log(`\nContact #${contacts.length + 1}`);
            contacts.push(this.getContactDetails());
            addMore = readline.question("Add another? (y/n): ").toLowerCase() === 'y';
        }

        const {success, errors} = this.addressBook.addMultipleContacts(contacts);
        
        console.log(`\n Added ${success.length} contacts successfully`);
        if (errors.length > 0) {
            console.log("\n Errors:");
            errors.forEach((err, i) => console.log(`${i + 1}. ${err}`));
        }
    }

    public run(): void {
        console.log(" Welcome to Address Book System");

        while (true) {
            this.showMenu();
            const choice = readline.question("Choose option (1-4): ");

            switch (choice) {
                case "1":
                    try {
                        const contact = this.addressBook.addContact(this.getContactDetails());
                        console.log("\n Contact added:\n" + contact.toString());
                    } catch (error) {
                        console.error("\n Error:", error instanceof Error ? error.message : "Invalid contact");
                    }
                    break;

                case "2":
                    this.addMultipleContactsFlow();
                    break;

                case "3":
                    const contacts = this.addressBook.getAllContacts();
                    console.log("\n All Contacts:");
                    contacts.forEach((c, i) => console.log(`${i + 1}. ${c.toString()}\n`));
                    break;

                case "4":
                    console.log(" Goodbye!");
                    return;

                default:
                    console.log(" Invalid option");
            }
        }
    }
}

// Start the application
new AddressBookApp().run();