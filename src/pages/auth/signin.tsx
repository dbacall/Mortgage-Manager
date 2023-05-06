import { signIn } from "next-auth/react"
import { useEffect } from "react"
import PropagateLoader from "react-spinners/PropagateLoader"

export default function SignIn({ }) {
  useEffect(() => {
    const signinRedirect = async () => {
      await signIn('auth0', { redirect: false, callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/`, email: '', password: '' })
    }
    signinRedirect().catch((err) => console.log(err))
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <PropagateLoader
        color="#0891b2"
      />
    </div>
  )
}