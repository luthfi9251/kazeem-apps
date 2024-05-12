"use server";
import { signIn, auth } from "@/auth";

export async function logIn(type, data) {
    await signIn(type, data);
}
