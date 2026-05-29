import NextAuth, { Profile } from "next-auth";
import { OIDCConfig } from "next-auth/providers";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    DuendeIDS6Provider({
      id: "id-server",
      clientId: "nextApp",
      clientSecret: "secret",
      issuer: process.env.ID_URL,
      authorization: {
        url: `${process.env.ID_URL}/connect/authorize`,
        params: { scope: "openid profile auctionApp" },
      },
      token: `${process.env.ID_URL_INTERNAL}/connect/token`,
      userinfo: `${process.env.ID_URL_INTERNAL}/connect/userinfo`,
      jwks_endpoint: `${process.env.ID_URL_INTERNAL}/.well-known/openid-configuration/jwks`,
      idToken: true,
    } as OIDCConfig<Omit<Profile, "username">>),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async authorized({ auth }) {
      return !!auth;
    },
    async jwt({ token, profile, account }) {
      if (profile) {
        token.username = profile.username;
      }
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
