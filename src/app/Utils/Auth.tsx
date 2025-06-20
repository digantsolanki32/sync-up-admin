// app/Utils/Auth.ts

// Define a type for credentials for better type safety
export type Credentials = {
    email: string;
    password: string;
};

// Define a new, more descriptive result type for our authentication check
export type AuthResult = {
    success: boolean;
    reason?: 'USER_NOT_FOUND' | 'INVALID_PASSWORD'; // The reason for failure
};

/**
 *
 * @param {Credentials} credentials The user's email and password.
 * @returns {Promise<AuthResult>} A promise that resolves to an object indicating success or failure with a reason.
 */
export const authenticateUser = (credentials: Credentials): Promise<AuthResult> => {
    return new Promise((resolve) => {
        // Simulate a network delay
        setTimeout(() => {
            const { email, password } = credentials;

            // Case 1: The email address does not exist.
            // This covers cases where both email and password might be wrong.
            if (email !== "admin@admin.com") {
                resolve({ success: false, reason: 'USER_NOT_FOUND' });
                return;
            }

            // Case 2: The email is correct, but the password is not.
            if (password !== "admin123") {
                resolve({ success: false, reason: 'INVALID_PASSWORD' });
                return;
            }

            // Case 3: Both email and password are correct.
            resolve({ success: true });

        }, 1000); // Using 1s delay for a more realistic feel
    });
};