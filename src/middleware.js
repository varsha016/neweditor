import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    console.log(path, "path");

    const isPublicPath = path === "/AdminLogin"; // Public path (login page)

    const token = request.cookies.get("token")?.value || "";

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url)); // Redirect token users from login page
    }
    // if (!token && !isPublicPath) {
    //     return NextResponse.redirect(new URL("/admin/AdminLogin", request.url)); // Redirect token users from login page
    // }

    const isProtectedPath = path.startsWith("/admin/dashboard") || path.startsWith("/admin/addUsers") || path.startsWith("/admin/generateCode");  // Protected pages

    if (!token && isProtectedPath) {
        return NextResponse.redirect(new URL("/admin/AdminLogin", request.url)); // Redirect untoken users
    }



    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/admin/dashboard", "/admin/addUsers", "/admin/AdminLogin", "/admin/generateCode"],
};
