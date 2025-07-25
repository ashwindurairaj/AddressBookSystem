import { Contact } from "./models/ContactPeron";
class AddressBookMain {
    displayWelcomeMessage() : void{
        console.log("Welcome to my Address Book Program");
    }

    start() : void {
        this.displayWelcomeMessage()

        const contact = new Contact (
            "Ashwin",
            "D",
            "S.S.Colony", 
            "Kalavasal",
            "Madurai",
            576124,
            12346788889,
            "ashwin@gmail.com"
        )
        contact.displayContact()
    }
}
const addressBook = new AddressBookMain()
addressBook.start()