import { NextResponse } from "next/server";
import { auth } from "@/auth";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/about/:path*",
};
