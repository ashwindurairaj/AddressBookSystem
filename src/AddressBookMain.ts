import  {ContactPerson}  from "./modal/ContactPeron";
import { AddressBook } from './modal/AddressBook';
class AddressBookMain
{
    welcomeToAddressBook():void
   {
     console.log(" Welcome to the Address Book Program");
   }

   private addressBook = new AddressBook()
   run():void
   {
    this.welcomeToAddressBook()
     const contact1 = new ContactPerson(
      "Ashwin",
      "D",
      "S.s.colony",
      "Kalavasal",
      "TN",
      603203,
      1234567890,
      "ashwin@gmail.com"
    );
    this.addressBook.addAccount(contact1)
    this.addressBook.getAllContacts()
    
   }
   
}
const addressApp =new AddressBookMain()
addressApp.run()