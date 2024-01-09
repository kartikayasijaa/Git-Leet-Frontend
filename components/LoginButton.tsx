"use client"
import { GITHUB_AUTH_REDIRECT } from "@/constants/url"
import useSession from "@/hooks/useSession"
import { Button, Spinner } from "@nextui-org/react"
import Link from "next/link"


const LoginButton: React.FC = () => {
  const { accessToken, isAuthenticated } = useSession();
  return (
    <>
      {isAuthenticated ? null : 
        <Button href={GITHUB_AUTH_REDIRECT} as={Link} color="primary" variant="flat">
          Log in
        </Button>
      }
    </>
  )
}

export default LoginButton