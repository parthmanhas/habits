import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && user.email) {
                const existingUser = await db.user.findUnique({
                    where: { email: user.email }
                });

                if (!existingUser) {
                    await db.user.create({
                        data: {
                            email: user.email!,
                            name: user.name,
                            image: user.image,
                        },
                    });
                }
            }
            return true;
        },
        async session({ session }) {

            const { user } = session;
            
            if(!user) {
                console.error('User not found in session');
                return session;
            }

            const dbUser = await db.user.findUnique({
                where: { email: user.email }
            });

            if (!dbUser) {
                console.error(`User not found in database: ${user.email}`);
                return session;
            }

            return {
                ...session,
                user: {
                    ...session.user,
                    id: dbUser.id,
                },
            };
        }
    }
})