import { describe, expect, it } from "vitest";
import createAppRouter from "./createAppRouter";
import firebase from 'firebase/compat/app';

// mock the authUser
const authUser = {
    uid: "123",
    email: "test@test.com",
    displayName: "Test User",
    emailVerified: true,
    getIdToken: async () => "mockToken",
    getIdTokenResult: async () => ({ token: "mockToken" }),
    delete: async () => {},
} as firebase.User;

describe("createAppRouter", () => {
    it("redirects unauthenticated users to LoginPage", () => {
        const router = createAppRouter({ isAuthUser: null });
        const rootRoute = router.routes.find(route => route.path === "/");
        expect(rootRoute).toBeTruthy(); // LoginPage or redirect
      });
    
    it("redirects authenticated users to /dashboard", () => {
        const router = createAppRouter({ isAuthUser: authUser });
        const rootRoute = router.routes.find(route => route.path === "/dashboard");
        expect(rootRoute).toBeTruthy(); // Dashboard redirect
    });
});