import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Temporary mock user
        return { id: '1', email: credentials?.email };
      }
    })
  ],
  pages: {
    signIn: '/login'
  }
});

export { handler as GET, handler as POST }; 