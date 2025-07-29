import { AddressBook } from "../Services/AddressBook";
import { AddressBookManager } from "../Manager/AddBookManager";
import { getInput } from "../Utils/Input";
import { isValidAddressBookName } from "../Utils/Validator";
import { Contact } from "../models/ContactPeron";

export class AddressBookMain {
    private addressBooks : Map<string , AddressBook> = new Map(); 

    displayWelcomeMessage(): void {
        console.log("\n  Welcome to my Address Book Program");
    }

    start(): void {
        this.displayWelcomeMessage();
        let exit = false
        while(!exit){
            console.log(`\n Main Menu: 
            1. Add New Address book
            2. Open Existing Address book
            3. Search person by City/State
            4. View persons by city/State
            5. Exit `);    
        const choice = getInput("\nEnter your choice: ")
        switch(choice) {
            case "1" : 
                this.createNewAddressBook()
                break
            case "2" : 
                this.openExistingAddressBook();
                break;
            case "3" :
                this.searchAcrossAddressBooks()
                break;
            case "4" : 
                this.viewPersonsByCityOrState()
                break;
            case "5" :
                console.log("\n Exiting the program.....")
                exit = true
                break
            default: 
                console.warn("\nInvalid Choice! Please enter 1,2 or 3"); 
            }
        }
    }

      private createNewAddressBook(): void {
        const name = getInput(
            "\nEnter a name for the new Address Book: ",
            isValidAddressBookName,
            " Invalid name. Must start with uppercase and have at least 3 letters."
        );
        if (this.addressBooks.has(name)) {
            console.log(" Address Book already exists. Choose a different name.");
        } else {
            this.addressBooks.set(name, new AddressBook());
            console.log(`\n Address Book "${name}" created successfully!`);
        }
    }


   private openExistingAddressBook(): void {
        if (this.addressBooks.size === 0) {
            console.log("\n  No Address Books available. Please create one first.");
            return;
        }

        console.log("\n Available Address Books:");
        [...this.addressBooks.keys()].forEach((name, index) => {
            console.log(`${index + 1}. ${name}`);
        });

        const name = getInput("\nEnter the name of the Address Book to open: ");
        const addressBook = this.addressBooks.get(name.trim());

        if (!addressBook) {
            console.log(" Address Book not found.");
            return;
        }

        const manager = new AddressBookManager(addressBook, name);
        manager.manage();
    }
    //* UC8 - Search person Accross city/state

    private searchAcrossAddressBooks(): void {
    if (this.addressBooks.size === 0) {
        console.log("\n No Address Books available.");
        return;
    }

    console.log(`
    🔍 Search Menu:
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
        console.log(`\n Found ${results.length} contact(s) for "${searchTerm}":`);
        results.forEach((r, index) => {
            console.log(`\n[${index + 1}] Address Book: ${r.bookName}`);
            r.contact.displayContact();
        });
    }
  }

  //* UC9 - View Person by city or state

  private viewPersonsByCityOrState()  : void {
    if(this.addressBooks.size === 0){
        console.log("\n No Address Books available.");
        return
    }
    console.log(`
     View Menu:
       1. View by City
       2. View by State
       3. Back to Main Menu
    `);
    const choice = getInput("Choose an option: ")
    let combinedMap = new Map<string, Contact[]>()
    switch(choice) {
        case "1":
            //merge all city maps
            this.addressBooks.forEach(book => {
                book.getContactsByCity().forEach((contacts, city) => {
                    if(!combinedMap.has(city)){
                        combinedMap.set(city, [])
                    }
                    combinedMap.get(city)!.push(...contacts)
                })
            })
            break;

        case "2" :
            //merge all state maps
            this.addressBooks.forEach(book => {
                book.getContactsbyState().forEach((contacts, state) => {
                    if(!combinedMap.has(state)){
                        combinedMap.set(state, [])
                    }
                    combinedMap.get(state)!.push(...contacts)
                })
            })
            break;
        case "3" :
            return 
        default: 
            console.log(" Invalid option. Returning to main menu.");
            return
    }
     // Display grouped results
    if (combinedMap.size === 0) {
        console.log("\n No contacts found.");
    } else {
        combinedMap.forEach((contacts, key) => {
            console.log(`\n ${key} (${contacts.length}):`);
            contacts.forEach(contact => console.log(` - ${contact.firstName} ${contact.lastName}`));
        });
    }
  }
}

