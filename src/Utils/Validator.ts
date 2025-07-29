
//* Additional Implementation for giving the regex 43validations for the user inputs

export function isValidAddressBookName(name : string) : boolean {
    return /^[A-Z][A-za-z0-9\s]{2,}$/.test(name)
}

export function isValidName(name: string): boolean {
    return /^[A-Z][a-zA-Z]{2,}$/.test(name); // Must start with uppercase & have at least 3 letters
}

export function isValidAddress(address: string): boolean {
    return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(address); // Allows letters, numbers, spaces & punctuation
}

export function isValidCityOrState(value: string): boolean {
    return /^[A-Za-z\s]{2,}$/.test(value); // Letters only, min length 2
}

export function isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email); 
}

export function isValidPhoneNumber(phone: number) : boolean {
    return /[6-9]\d{9}$/.test(phone.toString())
}

export function isValidZipCode(zip: number) : boolean {
    return /^\d{5,6}$/.test(zip.toString())
}