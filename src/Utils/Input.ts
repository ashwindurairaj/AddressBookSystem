import readlineSync from "readline-sync";

/**
 * Gets string input with optional validation.
 * If allowEmpty is true, pressing Enter returns an empty string without validation.
 */
export function getInput(prompt: string, validator?: (value: string) => boolean, errorMsg?: string, allowEmpty: boolean = false): string {
    while (true) {
        const input = readlineSync.question(prompt);
        if (allowEmpty && input.trim() === "") return "";  // <-- allow skipping
        if (!validator || validator(input)) return input;
        console.log(errorMsg || "Invalid input. Please try again.");
    }
}

/**
 * Gets numeric input with optional validation.
 * If allowEmpty is true, pressing Enter returns undefined without validation.
 */
export function getNumericInput(prompt: string, validator?: (value: number) => boolean, errorMsg?: string, allowEmpty: boolean = false): number | undefined {
    while (true) {
        const input = readlineSync.question(prompt);
        if (allowEmpty && input.trim() === "") return undefined;  // <-- allow skipping
        const num = Number(input);
        if (!isNaN(num) && (!validator || validator(num))) return num;
        console.log(errorMsg || " Invalid input. Please try again.");
    }
}