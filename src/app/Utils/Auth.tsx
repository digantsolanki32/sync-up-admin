// app/Utils/Auth.ts (NO CHANGES NEEDED)

// Define a type for credentials for better type safety
export type Credentials = {
    email: string;
    password: string;
};

/**
 *
 * @param {Credentials} credentials The user's email and password.
 * @returns {Promise<boolean>} A promise that resolves to true on successful
 * authentication or false on failure.
 */
export const authenticateUser = (credentials: Credentials): Promise<boolean> => {
    return new Promise((resolve) => {
        // Simulate a network delay
        setTimeout(() => {
            const { email, password } = credentials;

            if (email === "admin@admin.com" && password === "admin123") {
                // If credentials match, resolve the promise with true
                resolve(true);
            } else {
                // If credentials don't match, resolve with false
                resolve(false);
            }
        }, 10); // Added a 1s delay for a more realistic feel
    });
};