
import { AddressBook } from "../Services/AddressBook";
import { Contact } from "../models/ContactPeron";
import {isValidName, isValidAddress, isValidCityOrState  ,isValidEmail, isValidPhoneNumber, isValidZipCode } from "../Utils/Validator";
import { getInput , getNumericInput } from "../Utils/Input";

export class AddressBookManager {
    private addressBook : AddressBook
    private name : string
    constructor(addressBook : AddressBook, name : string){
        this.addressBook = addressBook
        this.name = name
    }
    public manage() : void {
         let backToMainMenu = false
        while(!backToMainMenu){
            console.log(`\n Address Book: "${this.name}"
            1. Add Contact
            2. Edit contact
            3. Delete Contact 
            4. Display all contacts
            5. Back to Main Menu`);

           const option = getInput("Choose an option: ");
            switch (option) {
                case "1":
                    this.addContact();
                    break;
                case "2":
                    const nameToEdit = getInput("Enter First Name of the contact to edit: ");
                    this.addressBook.editContactByName(nameToEdit);
                    break;
                case "3":
                    const nameToDelete = getInput("Enter First Name of the Contact to delete: ");
                    this.addressBook.deleteContactByName(nameToDelete);
                    break;
                case "4":
                    this.displayAllContacts();
                    break;
                case "5":
                    backToMainMenu = true;
                    break;
                default:
                    console.warn("Invalid option. Choose between 1-5.");
            }
        }
    }
   private displayAllContacts(): void {
        const allContacts = this.addressBook.getAllContacts();
        if (allContacts.length === 0) {
            console.log("\n No contacts found.");
        } else {
            allContacts.forEach((contact, index) => {
                console.log(`\nContact #${index + 1}`);
                contact.displayContact();
            });
        }
    }

   private addContact(): void {
    console.log("\n Add the contact details:");

    const firstName = getInput("Enter First Name: ", isValidName, " Invalid name. Must start with uppercase and have at least 2 letters.");
    const lastName = getInput("Enter Last Name: ", isValidName, " Invalid name. Must start with uppercase and have at least 2 letters.");
    const address = getInput("Enter Address: ", isValidAddress, " Invalid address. Must be at least 3 characters.");
    const city = getInput("Enter City: ", isValidCityOrState, " Invalid city. Must be at least 3 characters.");
    const state = getInput("Enter State: ", isValidCityOrState, " Invalid state. Must be at least 3 characters.");

    const zip = getNumericInput("Enter Zip Code: ", isValidZipCode, " Invalid zip. Must be 5-6 digits.");
    const phoneNumber = getNumericInput("Enter Phone Number: ", isValidPhoneNumber, " Invalid phone. Must be 10 digits starting with 6-9.");
    const email = getInput("Enter Email: ", isValidEmail, " Invalid email format.");

    const contact = new Contact(firstName, lastName, address, city, state, zip!, phoneNumber!, email);
    this.addressBook.addContact(contact);
}
}