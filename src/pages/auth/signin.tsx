import { signIn } from "next-auth/react"
import { useEffect } from "react"

export default function SignIn({ }) {
  useEffect(() => {
    const signinRedirect = async () => {
      await signIn('auth0', { callbackUrl: 'http://localhost:3000/' })
    }
    signinRedirect().catch((err) => console.log(err))
  }, [])

  return null
}