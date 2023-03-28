import { signOut } from "next-auth/react"
import { useEffect } from "react"
import HashLoader from "react-spinners/HashLoader"

export default function SignOut({ }) {
  useEffect(() => {
    const signoutRedirect = async () => {
      await signOut({ callbackUrl: 'http://localhost:3000/' })
    }
    signoutRedirect().catch((err) => console.log(err))
  }, [])

  return (
    <div className="h-full flex justify-center items-center">
      <HashLoader
        color="#0891b2"
      />
    </div>
  )
}