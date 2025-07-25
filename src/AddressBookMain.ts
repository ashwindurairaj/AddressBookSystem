import * as readline from "readline-sync";
import { AddressBookManager } from "./modal/AddressBookManager";
import { Contact, IContactData } from "./modal/ContactPeron";

class AddressBookApp {
    private manager = new AddressBookManager();
    private currentBookName: string | null = null;

    private get currentBook() {
        if (!this.currentBookName) return null;
        try {
            return this.manager.getAddressBook(this.currentBookName);
        } catch {
            return null;
        }
    }

    private showMainMenu(): void {
        console.log("\n==== Address Book Manager ====");
        console.log("1. Create New Address Book");
        console.log("2. Select Address Book");
        console.log("3. List All Address Books");
        console.log("4. Delete Address Book");
        console.log("5. Search Contacts");
        console.log("6. Exit");
    }

    private showAddressBookMenu(): void {
        console.log(`\n==== Current: ${this.currentBookName} ====`);
        console.log("1. Add Contact");
        console.log("2. View All Contacts");
        console.log("3. Back to Main Menu");
    }

    private showSearchMenu(): void {
        console.log("\n==== Search Contacts ====");
        console.log("1. Search by City");
        console.log("2. Search by State");
        console.log("3. Back to Main Menu");
    }

    private createAddressBook(): void {
        const name = readline.question("Enter new address book name: ");
        try {
            this.manager.createAddressBook(name);
            console.log(`Address book '${name}' created`);
        } catch (error) {
            console.error("Error:", error instanceof Error ? error.message : String(error));
        }
    }

    private selectAddressBook(): void {
        const name = readline.question("Enter address book name: ");
        try {
            this.manager.getAddressBook(name);
            this.currentBookName = name;
            console.log(`Switched to '${name}'`);
        } catch (error) {
            console.error("Error:", error instanceof Error ? error.message : String(error));
        }
    }

    private listAddressBooks(): void {
        const books = this.manager.getAllAddressBooks();
        if (books.size === 0) {
            console.log("No address books available");
            return;
        }
        console.log("\nAvailable Address Books:");
        books.forEach((_, name) => console.log(`- ${name}`));
    }

    private deleteAddressBook(): void {
        const name = readline.question("Enter address book name to delete: ");
        if (this.manager.deleteAddressBook(name)) {
            console.log(`Address book '${name}' deleted`);
            if (this.currentBookName === name) {
                this.currentBookName = null;
            }
        } else {
            console.log("Address book not found");
        }
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
            phone: readline.question("Phone: "),
            email: readline.question("Email: ")
        };
    }

    private addContact(): void {
        if (!this.currentBook) {
            console.log("No address book selected");
            return;
        }
        
        try {
            const contact = this.currentBook.addContact(this.getContactDetails());
            console.log("\nContact added successfully:");
            console.log(contact.toString());
        } catch (error) {
            console.error("\nError:", error instanceof Error ? error.message : String(error));
        }
    }

    private searchContacts(): void {
        while (true) {
            this.showSearchMenu();
            const choice = readline.question("Choose option (1-3): ");

            switch (choice) {
                case "1":
                    this.searchByCity();
                    break;
                case "2":
                    this.searchByState();
                    break;
                case "3":
                    return;
                default:
                    console.log("Invalid option");
            }
        }
    }

    private searchByCity(): void {
        const city = readline.question("Enter city to search: ");
        const results = this.manager.searchAcrossAllBooksByCity(city);
        this.displaySearchResults(results, `Contacts in ${city}`);
    }

    private searchByState(): void {
        const state = readline.question("Enter state to search: ");
        const results = this.manager.searchAcrossAllBooksByState(state);
        this.displaySearchResults(results, `Contacts in ${state}`);
    }

    private displaySearchResults(contacts: Contact[], title: string): void {
        if (contacts.length === 0) {
            console.log(`No ${title.toLowerCase()} found`);
            return;
        }

        console.log(`\n${title}:`);
        contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.toString()}\n`);
        });
    }

    public run(): void {
        console.log("Welcome to Address Book System");

        while (true) {
            if (!this.currentBookName) {
                this.showMainMenu();
                const choice = readline.question("Choose option (1-6): ");

                switch (choice) {
                    case "1":
                        this.createAddressBook();
                        break;
                    case "2":
                        this.selectAddressBook();
                        break;
                    case "3":
                        this.listAddressBooks();
                        break;
                    case "4":
                        this.deleteAddressBook();
                        break;
                    case "5":
                        this.searchContacts();
                        break;
                    case "6":
                        console.log("Goodbye!");
                        return;
                    default:
                        console.log("Invalid option");
                }
            } else {
                this.showAddressBookMenu();
                const choice = readline.question("Choose option (1-3): ");

                switch (choice) {
                    case "1":
                        this.addContact();
                        break;
                    case "2":
                        if (this.currentBook) {
                            this.currentBook.displayContacts();
                        }
                        break;
                    case "3":
                        this.currentBookName = null;
                        break;
                    default:
                        console.log("Invalid option");
                }
            }
        }
    }
}

// Start the application
new AddressBookApp().run();