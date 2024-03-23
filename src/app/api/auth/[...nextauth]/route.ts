import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authorize } from "./authorize";
import { useIntl } from 'react-intl';

interface UserToken {
  fullname: string;
  email: string
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        language: {label: "Language", type: "text"}
      },
      async authorize(credentials) {
        if (credentials) {
          try {
            const response = await authorize(credentials);
            if (response.status === 200) {
              return response.userFound;
            } else {
              throw new Error(response.message);
            }
          } catch (error:any) {
            throw new Error(error.message);
          }
        } else {
          throw new Error('Credentials not provided');
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userData = user as any;
        const userToken: UserToken = {
          fullname: userData.fullname,
          email: userData.email
        };
        token.user = userToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
