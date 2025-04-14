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
        "1047720422533-d0rmqanptqvdr8g6uv6k4nom5028phir.apps.googleusercontent.com",
      clientSecret: "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",
    }),

    //////////////   login user email or password     //////////////

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;
        try {
          await mongoose.connect(`${process.env.NEXT_PUBLIC_CONNECTIONSDB}`);
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          } else {
            const paswordnotmatch = await bcrypt.compare(
              password,
              user.password
            );
            if (!paswordnotmatch) {
              return null;
            }
            return user;
          }
        } catch (error) {
          console.log(error);
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
