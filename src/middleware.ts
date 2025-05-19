import { NextRequest, NextResponse } from "next/server"

import { PATH, PUBLIC_PATHS, TOKEN_KEY } from "@/constants/common"

export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value
  const pathname = req.nextUrl.pathname
  const isPublic = PUBLIC_PATHS.includes(pathname)

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL(PATH.LOGIN, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)", "/"],
}
