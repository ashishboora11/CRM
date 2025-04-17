import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import { User } from "@/database/model/contacts";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [

 //////////////   login user email or password     //////////////

    GoogleProvider({
      clientId:
        process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    }),

    //////////////   login user email or password     //////////////

     CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;
        try {
       await mongoose.connect(`${process.env.MONGODB_URI}`);
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("AccountNotFound");
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("InvalidCredentials");
          }
          return user;
        } catch (error: any) {
          throw new Error(error.message || "LoginFailed");
        }
      },
    }),
  ],
  secret: "LKSDJFKDSJFOWEJFPOCMPOWFJ",
  pages: {
    error: "/auth/error",
  },
  debug: true,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
