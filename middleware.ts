import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ТИМЧАСОВО ВІДКЛЮЧЕНО: Middleware для авторизації
// Увімкніть після підключення Supabase

// Публічні роути, які не потребують авторизації
// const publicRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  // ТИМЧАСОВО: Дозволяємо всі роути без перевірки
  return NextResponse.next()
  
  /* УВІМКНІТЬ ПІСЛЯ ПІДКЛЮЧЕННЯ SUPABASE:
  
  const { pathname } = request.nextUrl

  // Дозволяємо публічні роути
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Дозволяємо статичні файли та API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Перевіряємо наявність токену в cookies
  const token = request.cookies.get('sb-access-token')

  // Якщо немає токену - редірект на login
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
  */
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
