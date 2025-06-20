// app/api/login/route.ts

import { NextResponse } from 'next/server';
import { authenticateUser } from '@/app/Utils/Auth'; // Import from your Auth utility
import type { Credentials } from '@/app/Utils/Auth';

export async function POST(request: Request) {
    try {
        const credentials = (await request.json()) as Credentials;

        // Use the authentication utility to verify the user
        const authResult = await authenticateUser(credentials);

        if (authResult.success) {
            // If successful, create a response and set the session cookie
            const response = NextResponse.json({ success: true });
            response.cookies.set('auth_token', 'user_is_logged_in', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60, // Cookie expires in 1 hour
            });
            return response;
        } else {
            // If authentication fails, determine the correct message based on the reason
            let message = 'An unknown error occurred.';
            switch (authResult.reason) {
                case 'USER_NOT_FOUND':
                    message = 'Invalid credentials'; // User's email doesn't exist
                    break;
                case 'INVALID_PASSWORD':
                    message = 'Wrong password'; // Email was correct, password was not
                    break;
            }

            return NextResponse.json(
                { success: false, message: message },
                { status: 401 } // 401 Unauthorized is the correct status code
            );
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'An error occurred on the server' }, { status: 500 });
    }
}