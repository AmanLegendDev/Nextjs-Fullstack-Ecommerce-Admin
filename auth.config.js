import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { compare } from "bcryptjs";

const options = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },

      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const isValid = await compare(password, user.password);
        if (!isValid) throw new Error("Wrong password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // ⭐ GOOGLE + GITHUB → MongoDB me User Create
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        await connectDB();

        const exist = await User.findOne({ email: user.email });

        if (!exist) {
          await User.create({
            name: user.name,
            image: user.image,
            email: user.email,
            password: "", // OAuth users have no password
            role: "user",
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
  // Run only on sign in
  if (user) {
    await connectDB();

    const dbUser = await User.findOne({ email: user.email });

    token.id = dbUser._id.toString();
    token.role = dbUser.role;
    token.email = dbUser.email;
    token.name = dbUser.name;
    token.image = dbUser.image || "/default-avatar.png";

  }

  return token;
},

    async session({ session, token }) {
       session.user.id = token.id;
  session.user.role = token.role;
  session.user.email = token.email;
  session.user.name = token.name;
  session.user.image = token.image || "/default-avatar.png";


      return session;
    },
  },
};

export default options;
