import { PrismaClient } from "@prisma/client";  // Import PrismaClient to interact with the database

// Function to create a new instance of PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Declare a global variable `prisma` to maintain a single Prisma client instance
declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Initialize `db` with the existing global Prisma instance if it exists; otherwise, create a new instance
const db = globalThis.prisma ?? prismaClientSingleton();

export default db;  // Export the `db` instance for use in other parts of the application

// In development, assign the Prisma instance to `globalThis` to reuse it across module reloads
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
