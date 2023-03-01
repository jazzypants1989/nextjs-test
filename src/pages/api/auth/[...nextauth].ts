import bcryptjs from "bcryptjs"
import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import db from "../../../../prisma/prisma"

export default NextAuth(AuthOptions)
  
const AuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id
      if (user?.isAdmin) token.isAdmin = user.isAdmin
      if (user?.isEmployee) token.isEmployee = user.isEmployee
      if (user?.newsletter) token.newsletter = user.newsletter
      if (user?.email) token.email = user.email
      return token
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin
      if (token?.isEmployee) session.user.isEmployee = token.isEmployee
      if (token?.email) session.user.email = token.email
      if (token?.newsletter) session.user.newsletter = token.newsletter
      return session
    },
  },
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials) {
        const user = await db.user.findFirst({
          where: {
            email: credentials?.email,
          },
        })

        if (!user || !credentials?.password || !user.password) {
          throw new Error("Invalid email or password")
        }

        if (
          user &&
          bcryptjs.compareSync(credentials?.password, user.password)
        ) {
          return {
            _id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            isEmployee: user.isEmployee,
            newsletter: user.newsletter,
          }
        }
        throw new Error("Invalid email or password")
      },
    }),
  ],
}
