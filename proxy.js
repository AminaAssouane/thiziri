import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/signup"],
};
