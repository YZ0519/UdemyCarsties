import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  if (req.auth) return NextResponse.next();

  const { nextUrl } = req;
  const signInUrl = new URL("/api/auth/signin", req.url);
  signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
  return NextResponse.redirect(signInUrl);
});
export const config = {
  matcher: ["/session"],
};
