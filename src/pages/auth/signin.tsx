import { signIn } from "next-auth/react"
import { useEffect } from "react"
import HashLoader from "react-spinners/HashLoader"

export default function SignIn({ }) {
  useEffect(() => {
    const signinRedirect = async () => {
      await signIn('auth0', { redirect: false, callbackUrl: 'http://localhost:3000/', email: '', password: '' })
    }
    signinRedirect().catch((err) => console.log(err))
  }, [])

  return (
    <div className="h-full flex justify-center items-center">
      <HashLoader
        color="#0891b2"
      />
    </div>
  )
}