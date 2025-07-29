import * as fs from 'fs'
import * as path from 'path'
import { Contact } from '../models/ContactPeron';

export class FileManager {
    private static folderPath = path.join(process.cwd(), 'src', 'data');

    private static ensureFolderExists() : void {
        if(!fs.existsSync(this.folderPath)) {
            fs.mkdirSync(this.folderPath, {recursive:true})
        }
    }
    public static saveToFile(fileName: string, contacts: Contact[]): void {
        this.ensureFolderExists()
        const filePath = path.join(this.folderPath, fileName)
        const data = contacts.map(contact => contact.toString()).join("\n\n");
        fs.writeFileSync(filePath, data, "utf-8");
        console.log(`\n Address Book saved to file: ${filePath}`);
    }

   public static readFromFile(fileName: string): string | null {
        this.ensureFolderExists()
        const filePath = path.join(this.folderPath, fileName)
        if (!fs.existsSync(filePath)) {
            console.log(`\n File not found: ${filePath}`);
            return null;
        }
        const data = fs.readFileSync(filePath, "utf-8");
        console.log(`\n Address Book loaded from file: ${filePath}`);
        return data;
    }
    
    //* UC14 - Ability to Read/Write the Address Book with Persons Contact as CSV File
    
     public static saveToCSV(fileName: string, contacts: Contact[]): void {
        this.ensureFolderExists();
        const filePath = path.join(this.folderPath, fileName);
        const headers = "FirstName,LastName,Address,City,State,Zip,Phone,Email";
        const rows = contacts.map(c =>
            `${c.firstName},${c.lastName},${c.address},${c.city},${c.state},${c.zip},${c.phoneNumber},${c.email}`
        );
        const csvData = [headers, ...rows].join("\n");
        fs.writeFileSync(filePath, csvData, "utf-8");
        console.log(`\n Address Book saved as CSV: ${filePath}`);
    }

    public static readFromCSV(fileName: string): string | null {
        this.ensureFolderExists();
        const filePath = path.join(this.folderPath, fileName);
        if (!fs.existsSync(filePath)) {
            console.log(`\n File not found: ${filePath}`);
            return null;
        }
        const csvData = fs.readFileSync(filePath, "utf-8");
        console.log(`\n Address Book CSV loaded: ${filePath}`);
        return csvData;
    }
}