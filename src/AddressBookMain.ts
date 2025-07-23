import { AddressBook } from './modal/AddressBook';
import * as readline from "readline-sync"

class AddressBookMain
{
  private addressBook= new AddressBook()

    welcomeToAddressBook():void
   {
     console.log("Welcome to the Address Book Program");
   }
  
   run():void
   {
    this.welcomeToAddressBook()
    const personContact=this.addressBook.getContactFromUser()
    this.addressBook.addAccount(personContact)
    this.addressBook.getAllContacts()

    const nameToEdit=readline.question("Enter first name to edit :")

    this.addressBook.editContact(nameToEdit,{})

    this.addressBook.getAllContacts()



   

   }
   
}
const addressApp =new AddressBookMain()
addressApp.run()