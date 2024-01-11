import { GITHUB_AUTH_REDIRECT } from "@/constants/url";
import { Button, Spinner } from "@nextui-org/react";
import { cookies } from "next/headers";
import Link from "next/link";

const LoginButton: React.FC = () => {
  const cookie = cookies();
  const token = cookie.get(process.env.REFRESH_COOKIE_NAME!)?.value || "";
  return (
    <>
      {token.length > 0 ? null : (
        <Button
          href={GITHUB_AUTH_REDIRECT}
          as={Link}
          color="primary"
          variant="flat"
        >
          Log in
        </Button>
      )}
    </>
  );
};

export default LoginButton;
