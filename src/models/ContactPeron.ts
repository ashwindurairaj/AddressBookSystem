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
        console.log("\n Contact Details : ");
        console.log(` Name       : ${this.firstName} ${this.lastName}` );
        console.log(` Address    : ${this.address}, ${this.city}, ${this.state} - ${this.zip}`);
        console.log(` Phone No.  : ${this.phoneNumber}`);
        console.log(` Email      : ${this.email}`);
    }
}