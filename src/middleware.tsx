
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/profile", "/calendar", "/blank", "/(admin)", "/(admin)/dashboard", "/BasicTables", "/FormElements", "/(charts)", "/form-elements", "/basic-tables", "/line-chart", "/bar-chart", "/alerts", "/badge", "/buttons", "/images", "/videos", "/avatars" ];

// This function will run on specified routes to check for authentication.
export function middleware(req: NextRequest) {
    // 1. Get the session token from the user's cookies.
    const sessionToken = req.cookies.get("auth_token")?.value;

    // 2. If the user is trying to access a protected route without a token,
    //    redirect them to the sign-in page.
    if (!sessionToken && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/signin", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }

    // 3. If the check passes, allow the request to continue.
    return NextResponse.next();
}

// Use a matcher to specify which routes the middleware should run on.
// This is more efficient than running it on every single request.
export const config = {
    matcher: ['/', '/dashboard/:path*', "/profile", "/calendar", "/blank", "/(admin)", "/(admin)/dashboard", "/BasicTables", "/FormElements", "/(charts)", "/form-elements", "/basic-tables", "/line-chart", "/bar-chart", "/alerts", "/badge", "/buttons", "/images", "/videos", "avatars"] // Example: protects the homepage and all dashboard routes
};