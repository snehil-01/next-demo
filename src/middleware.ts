import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  let isPublic = false;
  if (
    pathname == "/login" ||
    pathname == "/signup" ||
    pathname == "/verifyemail"
  )
    isPublic = true;
  const token = request.cookies.get("token");

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/signup", "/login", "/profile", "/verifyemail"],
};
