import { Contact } from "../models/ContactPeron"
import { isValidEmail, isValidAddress, isValidCityOrState, isValidName, isValidPhoneNumber, isValidZipCode } from "../Utils/Validator";
import { getInput , getNumericInput} from "../Utils/Input";

export class AddressBook {
    private contacts : Contact[] = []

    //* UC2 : Ability to add a new Contact to Address Book
    //* Uc7 : Ability to ensure there is no dublicate entry of the same person in a particular Address Book

    addContact(contact : Contact) : void {
        const isDublicate = this.contacts.some(
            (c)=> c.equals(contact)
        )
        if(isDublicate){
            console.log(`\n Dublicate contact! "${contact.firstName} ${contact.lastName}" Already exists in the Address Book! "`);
            return
        }
        this.contacts.push(contact)
        console.log("\n Contact added successfully!\n");
    } 
    getAllContacts() : Contact[] {
        return this.contacts
    }

    //* UC3: Ability to edit an existing contact using their name via console input. 
    editContactByName(firstName: string): boolean {
        const contact = this.contacts.find(c => c.firstName.toLowerCase() === firstName.toLowerCase());
        if (!contact) {
            console.log(` Contact with name "${firstName}" not found.`);
            return false;
        }

        console.log(`\n Editing contact for: ${contact.firstName} ${contact.lastName}`);
        console.log("(Press Enter to keep the current value)");

        // If user presses Enter → keep old value
        const lastName = getInput(`Enter new Last Name [${contact.lastName}]: `, isValidName, "Invalid name. Must start with uppercase & have at least 2 letters.", true) || contact.lastName;
        const address = getInput(`Enter new Address [${contact.address}]: `, isValidAddress, "Invalid address. Must be at least 3 characters.", true) || contact.address;
        const city = getInput(`Enter new City [${contact.city}]: `, isValidCityOrState, "Invalid city. Must be at least 3 characters.", true) || contact.city;
        const state = getInput(`Enter new State [${contact.state}]: `, isValidCityOrState, "Invalid state. Must be at least 3 characters.", true) || contact.state;

        let zip = getNumericInput(`Enter new Zip Code [${contact.zip}]: `, isValidZipCode, "Invalid zip. Must be 5-6 digits.", true);
        if (!zip) zip = contact.zip;

        let phone = getNumericInput(`Enter new Phone Number [${contact.phoneNumber}]: `, isValidPhoneNumber, "Invalid phone. Must be 10 digits starting with 6-9.", true);
        if (!phone) phone = contact.phoneNumber;

        const email = getInput(`Enter new Email [${contact.email}]: `, isValidEmail, "Invalid email format.", true) || contact.email;

        // Update the contact
        contact.lastName = lastName;
        contact.address = address;
        contact.city = city;
        contact.state = state;
        contact.zip = zip;
        contact.phoneNumber = phone;
        contact.email = email;

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
    //* UC8 : Ability to search person in a city or state accross the multiple book

    searchByCity(city: string): Contact[] {
        return this.contacts.filter(c => c.city.toLowerCase() === city.toLowerCase());
    }

    searchByState(state: string): Contact[] {
        return this.contacts.filter(c => c.state.toLowerCase() === state.toLowerCase());
    }

    //* UC9 : Ability to view Persons by city or state

    getContactsByCity(): Map<string, Contact[]> {
        const cityMap = new Map<string, Contact[]>() 
        this.contacts.forEach(contact => {
            const city = contact.city
            if(!cityMap.has(city)){
                cityMap.set(city, [])
            }
            cityMap.get(city)!.push(contact)
        })
        return cityMap
    }

    getContactsbyState() : Map<string, Contact[]> {
        const stateMap = new Map<string, Contact[]> () 
        this.contacts.forEach(contact => {
            const state = contact.state
            if(!stateMap.has(state)){
                stateMap.set(state,[])
            }
            stateMap.get(state)!.push(contact)
        }) 
        return stateMap
    }

    //* UC11 & UC12: Ability to sort contacts by Name, City, State, or Zip
    public getSortedContactsByField(field: "name" | "city" | "state" | "zip"): Contact[] {
        return [...this.contacts].sort((a, b) => {
            switch (field) {
                case "name":
                    return (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName);
                case "city":
                    return a.city.localeCompare(b.city);
                case "state":
                    return a.state.localeCompare(b.state);
                case "zip":
                    return (a.zip||0) - (b.zip || 0);
                default:
                    return 0;
            }
        });
    }

    
 }

