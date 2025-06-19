// app/api/login/route.ts

import { NextResponse } from 'next/server';
import { authenticateUser } from '@/app/Utils/Auth'; // Import from your Auth utility
import type { Credentials } from '@/app/Utils/Auth';

export async function POST(request: Request) {
    try {
        const credentials = (await request.json()) as Credentials;

        // Use the authentication utility to verify the user
        const isAuthenticated = await authenticateUser(credentials);

        if (isAuthenticated) {
            // If successful, create a response and set the session cookie
            const response = NextResponse.json({ success: true });
            response.cookies.set('auth_token', 'user_is_logged_in', { // The value can be anything for this simple case
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24, // Cookie expires in 1 day
            });
            return response;
        } else {
            // If authentication fails, return an error
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
    }
}