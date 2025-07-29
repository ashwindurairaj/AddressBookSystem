
import { AddressBook } from "../Services/AddressBook";
import { Contact } from "../models/ContactPeron";
import { getInput } from "../Utils/Input";

export class ReportManager {
    private addressBooks: Map<string, AddressBook>;

    constructor(addressBooks: Map<string, AddressBook>) {
        this.addressBooks = addressBooks;
    }

    //* UC8 - Search person across AddressBooks by City/State
    public searchAcrossAddressBooks(): void {
        if (this.addressBooks.size === 0) {
            console.log("\n No Address Books available.");
            return;
        }

        console.log(`
        Search Menu:
        1. Search by City
        2. Search by State
        3. Back to Main Menu
        `);

        const choice = getInput("Choose an option: ");
        let searchTerm: string;
        let results: { bookName: string; contact: Contact }[] = [];

        switch (choice) {
            case "1": // Search by city
                searchTerm = getInput("\nEnter City to search: ");
                this.addressBooks.forEach((book, name) => {
                    const matches = book.searchByCity(searchTerm);
                    matches.forEach(contact => results.push({ bookName: name, contact }));
                });
                break;
            case "2": // Search by state
                searchTerm = getInput("\nEnter State to search: ");
                this.addressBooks.forEach((book, name) => {
                    const matches = book.searchByState(searchTerm);
                    matches.forEach(contact => results.push({ bookName: name, contact }));
                });
                break;
            case "3":
                return;
            default:
                console.log(" Invalid option. Returning to main menu.");
                return;
        }

        if (results.length === 0) {
            console.log(`\n No contacts found for "${searchTerm}".`);
        } else {
            console.log(`\ Found ${results.length} contact(s) for "${searchTerm}":`);
            results.forEach((r, index) => {
                console.log(`\n[${index + 1}] Address Book: ${r.bookName}`);
                r.contact.displayContact();
            });
        }
    }

    //* UC9 - View Persons by City or State
    public viewPersonsByCityOrState(): void {
        if (this.addressBooks.size === 0) {
            console.log("\n No Address Books available.");
            return;
        }
        console.log(`
         View Menu:
        1. View by City
        2. View by State
        3. Back to Main Menu
        `);
        const choice = getInput("Choose an option: ");
        let combinedMap = new Map<string, Contact[]>();

        switch (choice) {
            case "1":
                this.addressBooks.forEach(book => {
                    book.getContactsByCity().forEach((contacts, city) => {
                        if (!combinedMap.has(city)) combinedMap.set(city, []);
                        combinedMap.get(city)!.push(...contacts);
                    });
                });
                break;
            case "2":
                this.addressBooks.forEach(book => {
                    book.getContactsbyState().forEach((contacts, state) => {
                        if (!combinedMap.has(state)) combinedMap.set(state, []);
                        combinedMap.get(state)!.push(...contacts);
                    });
                });
                break;
            case "3":
                return;
            default:
                console.log(" Invalid option. Returning to main menu.");
                return;
        }

        if (combinedMap.size === 0) {
            console.log("\n No contacts found.");
        } else {
            combinedMap.forEach((contacts, key) => {
                console.log(`\n ${key} (${contacts.length}):`);
                contacts.forEach(contact => console.log(` - ${contact.firstName} ${contact.lastName}`));
            });
        }
    }

    //* UC10 - Count contacts by City or State
    public countContactsByCityOrState(): void {
        if (this.addressBooks.size === 0) {
            console.log("\n  No Address Books available.");
            return;
        }
        console.log(`
         Count Menu:
        1. Count by City
        2. Count by State
        3. Back to Main Menu
        `);
        const choice = getInput("Choose an option: ");
        let combinedMap = new Map<string, Contact[]>();

        switch (choice) {
            case "1":
                this.addressBooks.forEach(book => {
                    book.getContactsByCity().forEach((contacts, city) => {
                        if (!combinedMap.has(city)) combinedMap.set(city, []);
                        combinedMap.get(city)!.push(...contacts);
                    });
                });
                break;
            case "2":
                this.addressBooks.forEach(book => {
                    book.getContactsbyState().forEach((contacts, state) => {
                        if (!combinedMap.has(state)) combinedMap.set(state, []);
                        combinedMap.get(state)!.push(...contacts);
                    });
                });
                break;
            case "3":
                return;
            default:
                console.log(" Invalid option. Returning to main menu.");
                return;
        }

        if (combinedMap.size === 0) {
            console.log("\n No contacts found.");
        } else {
            console.log("\n Contact Count:");
            combinedMap.forEach((contacts, key) => {
                console.log(` - ${key}: ${contacts.length} contact(s)`);
            });
        }
    }
}