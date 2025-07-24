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

  update(updateData: Partial<Omit<Contact, 'id'>>): void {
    Object.assign(this, updateData);
    this.validate();
  }

  private validate(): void {
    const errors: string[] = [];
    
    if (!this.firstName.trim() || !this.lastName.trim()) {
      errors.push("First and last names are required");
    }
    if (!/^\d{6}$/.test(this.zip)) {
      errors.push("Zip code must be 6 digits");
    }
    if (!/^\+?\d{10,15}$/.test(this.phone)) {
      errors.push("Invalid phone number format");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push("Invalid email format");
    }

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
  }

  toString(): string {
    return ` ${this.firstName} ${this.lastName}\n` +
           ` ${this.address}, ${this.city}, ${this.state} ${this.zip}\n` +
           ` ${this.phone} | ✉️ ${this.email}`;
  }

  matchesName(firstName: string, lastName: string): boolean {
    return this.firstName.toLowerCase() === firstName.toLowerCase() && 
           this.lastName.toLowerCase() === lastName.toLowerCase();
  }
}