import * as path from 'path';
import * as fs from 'fs';
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
}