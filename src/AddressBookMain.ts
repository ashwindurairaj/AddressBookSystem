import * as readline from "readline-sync";
import { AddressBook } from "./modal/AddressBook";
// import { Contact } from "./models/Contact";

class AddressBookApp {
  private addressBook = new AddressBook();

  private showMenu(): void {
    console.log("\n==== Address Book Menu ====");
    console.log("1. Add Contact");
    console.log("2. View Contacts");
    console.log("3. Edit Contact");
    console.log("4. Delete Contact");
    console.log("5. Exit");
  }

  private getDeleteConfirmation(name: string): boolean {
    const answer = readline.question(
      `Are you sure you want to delete ${name}? (y/n): `
    );
    return answer.toLowerCase() === 'y';
  }

  run(): void {
    console.log("Welcome to Address Book System");

    while (true) {
      this.showMenu();
      const choice = readline.question("Choose option (1-5): ");

      switch (choice) {
        // ... existing cases 1-3 ...

        case "4":
          try {
            console.log("\nEnter contact to delete:");
            const firstName = readline.question("First Name: ");
            const lastName = readline.question("Last Name: ");
            const fullName = `${firstName} ${lastName}`;

            if (this.getDeleteConfirmation(fullName)) {
              const deleted = this.addressBook.deleteContact(firstName, lastName);
              if (deleted) {
                console.log(`\n Contact ${fullName} deleted successfully!`);
              } else {
                console.log(`\n Contact ${fullName} not found`);
              }
            } else {
              console.log("\nDeletion cancelled");
            }
          } catch (error) {
            console.error("\n Error:", error instanceof Error ? error.message : "Failed to delete contact");
          }
          break;

        case "5":
          console.log(" Goodbye!");
          return;

        default:
          console.log(" Invalid choice. Please try again.");
      }
    }
  }
}

new AddressBookApp().run();