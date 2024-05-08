"use server";
import { signIn } from "@/auth";

export async function logIn(type, data) {
    try {
        await signIn(type, data, { redirectTo: "/dashboard" });
    } catch (err) {
        throw new Error("Password salah atau user tidak ditemukan!");
    }
}
