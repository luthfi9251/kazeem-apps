import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "@/lib/bcrypt";
import prisma from "./lib/prisma";
import { reducePageAccessGroups } from "./actions/group";

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: false,
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;
                // const pwHash = hashPassword(credentials.password);

                // logic to verify if user exists
                user = await prisma.User.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (user) {
                    let checkPassword = comparePassword(
                        credentials.password,
                        user.password
                    );
                    // console.log(user);
                    if (checkPassword) return user;
                    else throw new Error("Password Salah");
                } else {
                    throw new Error("User not found.");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // User is available during sign-in
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
                token.nama_lengkap = user.nama_lengkap;
                token.aktif = user.aktif;
            }
            return token;
        },
        async session({ session, token }) {
            let groups = await prisma.UserGroup.findMany({
                where: { user_id: token.id },
                include: {
                    group: {
                        select: {
                            nama_group: true,
                            PageAccess: {
                                select: {
                                    Page: {
                                        select: {
                                            nama: true,
                                            kategori: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            let accessPage = await reducePageAccessGroups(groups);
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.email = token.email;
            session.user.nama_lengkap = token.nama_lengkap;
            session.user.aktif = token.aktif;
            session.user.groups = groups.map((item) => item.group.nama_group);
            session.user.accessPage = accessPage;
            return session;
        },
    },
});
