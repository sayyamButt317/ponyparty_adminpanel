import { Console } from "console";

// Function to check if the given password matches the hashed password
export async function isValidPassword(password: string, hashedPassword: string) {
    // Hash the provided password and log it to the console
    console.log(await hashPassword(password));
    // Compare the hashed password with the provided hashedPassword and return the result
    return await hashPassword(password) === hashedPassword;
}

// Helper function to hash the password using SHA-512
async function hashPassword(password: string) {
    // Convert the password string to an ArrayBuffer, then hash it with SHA-512
    const arrayBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password));
    // Convert the hashed ArrayBuffer to a base64 string and return it
    return Buffer.from(arrayBuffer).toString("base64");
}
