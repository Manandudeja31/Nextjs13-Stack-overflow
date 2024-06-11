import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/ask-question"]);
// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/api/webhook",
//   "/questions/:id",
//   "/tags",
//   "/tags/:id",
//   "/profile/:id",
//   "/community",
//   "/jobs",
// ]);
// const ignoredRoutes = createRouteMatcher(["/api/webhook", "/api/chatgpt"]);
export default clerkMiddleware((auth, req) => {
  // if (isPublicRoute(req)) {
  //   return;
  // }

  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
