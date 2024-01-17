import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
  }
}
