import { signOut } from "next-auth/react"
import { useEffect } from "react"
import PropagateLoader from "react-spinners/PropagateLoader"

export default function SignOut({ }) {
  useEffect(() => {
    const signoutRedirect = async () => {
      await signOut({ callbackUrl: 'http://localhost:3000/' })
    }
    signoutRedirect().catch((err) => console.log(err))
  }, [])

  return (
    <div className="h-full flex justify-center items-center">
      <PropagateLoader
        color="#0891b2"
      />
    </div>
  )
}