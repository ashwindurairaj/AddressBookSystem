
//* Additional Implementation for giving the regex 43validations for the user inputs

export function isValidEmail(email : string) : boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export function isValidPhoneNumber(phone: number) : boolean {
    return /[6-9]\d{9}$/.test(phone.toString())
}

export function isValidZipCode(zip: number) : boolean {
    return /^\d{5,6}$/.test(zip.toString())
}