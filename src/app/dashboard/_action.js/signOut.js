"use server";
import { signOut } from "@/auth";
export default async function signOutFunc() {
    return await signOut({ redirectTo: "/login" });
}
