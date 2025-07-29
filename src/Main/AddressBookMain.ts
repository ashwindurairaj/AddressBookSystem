import { AddressBook } from "../Services/AddressBook";
import { AddressBookManager } from "../Manager/AddBookManager";
import { getInput } from "../Utils/Input";
import { isValidAddressBookName } from "../Utils/Validator";
import { ReportManager } from "../Manager/ReportManager";
import { FileManager } from "../Utils/FileManager";

export class AddressBookMain {
    private addressBooks : Map<string , AddressBook> = new Map(); 

    displayWelcomeMessage(): void {
        console.log("\n Welcome to my Address Book Program");
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
            10. Save Address Book to JSON
            11. Load Address Book from JSON
            12. Exit `); 
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
            case "6": this.saveAddressBook("txt"); 
                break;
            case "7": this.loadAddressBook("txt"); 
                break;
            case "8": this.saveAddressBook("csv"); 
                break;
            case "9": this.loadAddressBook("csv"); 
                break;
            case "10": this.saveAddressBook("json"); 
                break;
            case "11": this.loadAddressBook("json"); 
                break;
            case "12": console.log("\n Exiting the program....."); 
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
            console.log("\n No Address Books available. Please create one first.");
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

    private chooseAddressBook(action: string): AddressBook | null {
        if (this.addressBooks.size === 0) {
            console.log(`\n No Address Books to ${action} `);
            return null;
        }
        console.log("\n Available Address Books:");
        [...this.addressBooks.keys()].forEach((name, index) => console.log(`${index + 1}. ${name}`));
        const bookName = getInput(`Enter the name of the Address Book to ${action}: `);
        const addressBook = this.addressBooks.get(bookName.trim());
        if (!addressBook) {
            console.log(" Address Book not found.");
            return null;
        }
        return addressBook
   }

   //* UC13, UC14, UC15 - applied DRY design principle (No dublication of code)

   private chooseFileName(prompt : string) : string {
    return getInput(prompt)
   }
    
    private saveAddressBook(format: "txt" | "csv" | "json") : void {
        const addressBook = this.chooseAddressBook(`Save as ${format.toUpperCase()}`)
        if(!addressBook) 
            return;
        const fileName = this.chooseFileName(`Enter ${format.toUpperCase()} file name (e.g., mybook.${format})`)
        const contacts = addressBook.getAllContacts()
        switch(format) {
            case "txt" : 
                FileManager.saveToFile(fileName, contacts)
                break
            case "csv" :
                FileManager.saveToCSV(fileName, contacts)
                break
            case "json" : 
                FileManager.saveToJSON(fileName, contacts)
                break
        }
    }

    private loadAddressBook(format : "txt" | "csv" | "json") : void {
        const fileName = this.chooseFileName(`Enter ${format.toUpperCase()} file name to load: `)
        let data : string | object | null = null 
        switch(format) {
            case "txt" : 
                data = FileManager.readFromFile(fileName)
                break
            case "csv" : 
                data = FileManager.readFromCSV(fileName)
                break
            case "json" : 
                data = FileManager.readFromJSON(fileName)
                break
        }
        if(data) {
            console.log(`\n Loaded ${format.toUpperCase()} Data: \n`, data);
            
        }
    }
}

