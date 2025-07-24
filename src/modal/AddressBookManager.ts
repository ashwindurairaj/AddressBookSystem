import { AddressBook } from "./AddressBook";

export class AddressBookManager {
    private addressBooks: Map<string, AddressBook> = new Map();

    createAddressBook(name: string): void {
        if (!name.trim()) throw new Error("Address book name cannot be empty");
        if (this.addressBooks.has(name)) {
            throw new Error(`Address book '${name}' already exists`);
        }
        this.addressBooks.set(name, new AddressBook());
    }

    getAddressBook(name: string): AddressBook {
        const book = this.addressBooks.get(name);
        if (!book) throw new Error(`Address book '${name}' not found`);
        return book;
    }

    getAllAddressBooks(): Map<string, AddressBook> {
        return new Map(this.addressBooks);
    }

    deleteAddressBook(name: string): boolean {
        return this.addressBooks.delete(name);
    }

    hasAddressBook(name: string): boolean {
        return this.addressBooks.has(name);
    }
}