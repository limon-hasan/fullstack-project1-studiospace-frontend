import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    if (!user) {
        // Current URL path-ti query parameter e niye signin page e pathano
        const currentPath = request.nextUrl.pathname;
        const signInUrl = new URL('/signin', request.url);
        signInUrl.searchParams.set('callbackUrl', currentPath);

        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/add-studio",
        "/my-listings",
        "/studios/edit/:path*",
        "/my-bookings"
    ],
}