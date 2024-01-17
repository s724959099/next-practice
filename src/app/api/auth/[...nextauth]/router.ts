import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/model/db";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials, req) {
                const mUser = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });
                if (!mUser) {
                    return null;
                }
                console.log(credentials, req);
                return {
                    ...mUser,
                    id: mUser.id.toString(),
                };

            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // async jwt({ token, user }) {
        //   // user && (token.user = user);
        //   console.log('iam token', token);
        //   // return token;
        //   return {
        //     ...token,
        //     user,
        //   };
        // },
        // async session({ session, token }) {
        //   session = token.user as any;
        //   console.log('iam session', session);
        //   return session;
        // },
    },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
