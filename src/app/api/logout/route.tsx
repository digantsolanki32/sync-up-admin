

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const response = NextResponse.json({ success: true, message: "Logged out successfully" });

    // Instruct the browser to delete the cookie immediately
    response.cookies.set('auth_token', '', {
        httpOnly: true,
        path: '/',
        maxAge: -1,
    });

    return response;
}