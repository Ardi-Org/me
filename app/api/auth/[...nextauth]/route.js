import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED_EMAIL = "shaonix@gmail.com";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      return user.email === ALLOWED_EMAIL;
    },

    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    // },

    async jwt({ token, account }) {
      const now = Date.now();
      const MAX_IDLE = 10 * 60 * 1000; // 10 minutes idle

      if (account) {
        token.lastActivity = now;
        return token;
      }

      if (token.lastActivity && now - token.lastActivity > MAX_IDLE) {
        return {}; // force logout
      }

      token.lastActivity = now;
      return token;
    },

    async session({ session, token }) {
      session.lastActivity = token.lastActivity;
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes absolute
    updateAge: 5 * 60,
  },
});

export { handler as GET, handler as POST };
