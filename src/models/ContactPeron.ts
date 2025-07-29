//* UC1 : Ability to create a contacts
export class Contact {
    constructor(
        public firstName : string,
        public lastName : string,
        public address : string,
        public city : string,
        public state : string,
        public zip : number,
        public phoneNumber : number,
        public email : string
    ){}

    displayContact(): void {
        console.log("\nContact Details : ");
        console.log(` Name       : ${this.firstName} ${this.lastName}` );
        console.log(` Address    : ${this.address}, ${this.city}, ${this.state} - ${this.zip}`);
        console.log(` Phone No.  : ${this.phoneNumber}`);
        console.log(` Email      : ${this.email}`);
    }

    //* UC7 - Compare two contacts for equality (based on first and last name)

    equals(other: Contact): boolean {
        return (
            this.firstName.toLowerCase() === other.firstName.toLowerCase() &&
            this.lastName.toLowerCase() === other.lastName.toLowerCase() 
        )
    }

    //* UC11 - Override toString for nice printing
    toString(): string {
        return ` ${this.firstName} ${this.lastName} |  ${this.address}, ${this.city}, ${this.state} - ${this.zip} |  ${this.phoneNumber} | ${this.email}`;
    }

}