import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {

  if (!process.client) return;
  
  const auth = useAuthStore();
  auth.hydrate();

  const publicRoutes = ["/login", "/register"];

  if (auth.isAuthenticated && publicRoutes.includes(to.path)) {
    return navigateTo("/tickets");
  }

  if (!auth.isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo("/login");
  }
});
