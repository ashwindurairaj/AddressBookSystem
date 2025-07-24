export interface IContactData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
}

export class Contact {
    constructor(
        public readonly id: string,
        public firstName: string,
        public lastName: string,
        public address: string,
        public city: string,
        public state: string,
        public zip: string,
        public phone: string,
        public email: string
    ) {
        this.validate();
    }

    private validate(): void {
        const errors: string[] = [];
        
        if (!this.firstName.trim()) errors.push("First name is required");
        if (!this.lastName.trim()) errors.push("Last name is required");
        if (!/^\d{6}$/.test(this.zip)) errors.push("Zip code must be 6 digits");
        if (!/^\+?\d{10,15}$/.test(this.phone)) errors.push("Invalid phone format");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) errors.push("Invalid email");

        if (errors.length > 0) throw new Error(errors.join(", "));
    }

    toString(): string {
        return `${this.firstName} ${this.lastName}\n` +
               `${this.address}, ${this.city}, ${this.state} ${this.zip}\n` +
               ` ${this.phone} | ✉️ ${this.email}`;
    }
}