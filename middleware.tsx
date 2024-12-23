import { clerkMiddleware , createRouteMatcher} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
    '/upcoming',
    '/previous',
    '/recording',
    '/personal-room',
    '/meeting(.*)',
])



export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()
    const currentUrl = new URL(req.url);
    console.log(currentUrl.pathname);
    if(!userId && isProtectedRoute(req)){
        return NextResponse.redirect(new URL("/",req.url))
    }

  })


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}