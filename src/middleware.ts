import { NextRequest, NextResponse } from "next/server"

import { PATH, TOKEN_KEY } from "@/constants/common"

export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value
  const pathname = req.nextUrl.pathname

  const PUBLIC_PATHS = ["/login", "/api"]
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path))

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL(PATH.LOGIN, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/"],
}
