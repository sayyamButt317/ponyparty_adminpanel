import { NextRequest, NextResponse } from "next/server";  // Import Next.js request and response types
import { isValidPassword } from "./lib/isValidPassword";  // Import password validation function

// Middleware function to authenticate requests
export async function middleware(req: NextRequest) {
    // Check if the request is authenticated
    if ((await isAuthenticated(req)) === false) {
        // If not authenticated, respond with 401 Unauthorized status
        return new NextResponse("Unauthorized", {
            status: 401,
            headers: { "WWW-Authenticate": "Basic" },  // Prompt for Basic authentication
        });
    }
}

// Helper function to check authentication based on authorization header
async function isAuthenticated(req: NextRequest) {
    // Get the 'authorization' header from the request
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
    if (authHeader == null) return false;  // If no auth header is provided, return false

    // Decode the base64 encoded username and password from the header
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
    console.log(username,password)

    // Check if the provided password matches the stored hashed password
    isValidPassword(password, "sdfdsf");  // Example usage of isValidPassword (replace "sdfdsf" as necessary)

    // Verify that the username and hashed password match the stored values in environment variables
    return username === process.env.ADMIN_USERNAME &&
        (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string));
}

// Configuration for middleware, applies to routes under '/admin'
export const config = {
    matcher: "/admin/:path*",  // Middleware will run for all paths under '/admin'
};
