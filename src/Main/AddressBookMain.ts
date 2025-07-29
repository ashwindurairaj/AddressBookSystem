import { AddressBook } from "../Services/AddressBook";
import { AddressBookManager } from "../Manager/AddBookManager";
import { getInput } from "../Utils/Input";
import { isValidAddressBookName } from "../Utils/Validator";
import { ReportManager } from "../Manager/ReportManager";
import { FileManager } from "../Utils/FileManager";

export class AddressBookMain {
    private addressBooks : Map<string , AddressBook> = new Map(); 

    displayWelcomeMessage(): void {
        console.log("\n  Welcome to my Address Book Program");
    }

    start(): void {
        this.displayWelcomeMessage();
        let exit = false
        const reportManager = new ReportManager(this.addressBooks)
        while(!exit){
            console.log(`\n Main Menu: 
            1. Add New Address book
            2. Open Existing Address book
            3. Search person by City/State
            4. View persons by city/State
            5. Count contacts by City/State
            6. Save Address Book to File
            7. Load Address Book from File
            8. Save Address Book to CSV
            9. Load Address Book from CSV
            10. Exit `); 
        const choice = getInput("\nEnter your choice: ")
        switch(choice) {
            case "1" : 
                this.createNewAddressBook()
                break
            case "2" : 
                this.openExistingAddressBook();
                break
            case "3" :
                reportManager.searchAcrossAddressBooks()
                break
            case "4" : 
                reportManager.viewPersonsByCityOrState()
                break
            case "5" :
                reportManager.countContactsByCityOrState()
                break
            case "6": this.saveAddressBookToFile(); 
                break;
            case "7": this.loadAddressBookFromFile(); 
                break;
            case "8": this.saveAddressBookToCSV(); 
                break;
            case "9": this.loadAddressBookFromCSV(); 
                break;
            case "10": console.log("\n Exiting the program....."); 
                exit = true; 
                break;
            default: console.warn("\nInvalid Choice! Please enter 1–10");
            }
        }
    }

      private createNewAddressBook(): void {
        const name = getInput(
            "\nEnter a name for the new Address Book: ",
            isValidAddressBookName,
            "Invalid name. Must start with uppercase and have at least 3 letters."
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

    private saveAddressBookToFile(): void {
        if (this.addressBooks.size === 0) {
            console.log("\n No Address Books to save.");
            return;
        }
        console.log("\n Available Address Books:");
        [...this.addressBooks.keys()].forEach((name, index) => console.log(`${index + 1}. ${name}`));
        const bookName = getInput("Enter the name of the Address Book to save: ");
        const addressBook = this.addressBooks.get(bookName.trim());
        if (!addressBook) {
            console.log(" Address Book not found.");
            return;
        }
        const fileName = getInput("Enter file name to save (e.g., mybook.txt): ");
        FileManager.saveToFile(fileName, addressBook.getAllContacts());
    }

    private loadAddressBookFromFile(): void {
        const fileName = getInput("Enter file name to load: ");
        const data = FileManager.readFromFile(fileName);
        if (data) {
            console.log("\nLoaded Data:\n" + data);
        }
    }
    //* UC14 - Ability to Read/Write the Address Book with Persons Contact as CSV File 
    private saveAddressBookToCSV(): void {
        if (this.addressBooks.size === 0) {
            console.log("\n No Address Books to save.");
            return;
        }
        console.log("\n Available Address Books:");
        [...this.addressBooks.keys()].forEach((name, index) => console.log(`${index + 1}. ${name}`));
        const bookName = getInput("Enter the name of the Address Book to save as CSV: ");
        const addressBook = this.addressBooks.get(bookName.trim());
        if (!addressBook) {
            console.log(" Address Book not found.");
            return;
        }
        const fileName = getInput("Enter CSV file name (e.g., mybook.csv): ");
        FileManager.saveToCSV(fileName, addressBook.getAllContacts());
    }

    private loadAddressBookFromCSV(): void {
        const fileName = getInput("Enter CSV file name to load: ");
        const data = FileManager.readFromCSV(fileName);
        if (data) {
            console.log("\nLoaded CSV Data:\n" + data);
        }
    }
}

