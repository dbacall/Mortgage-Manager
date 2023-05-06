import { signOut } from "next-auth/react"
import { useEffect } from "react"
import PropagateLoader from "react-spinners/PropagateLoader"

export default function SignOut({ }) {
  useEffect(() => {
    const signoutRedirect = async () => {
      await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/` })
    }
    signoutRedirect().catch((err) => console.log(err))
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <PropagateLoader
        color="#0891b2"
      />
    </div>
  )
}