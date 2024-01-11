"use client";
import { refreshToken } from "@/app/actions";
import { AccessTokenType } from "@/constants/types";
import { REFRESH_TOKEN } from "@/constants/url";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SpinnerComp from "../Spinner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { accessToken, setAuth, user } = useSession();
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(user)
    if (accessToken && accessToken.length > 1) {
      setShow(true);
      return;
    }
    (async () => {
      const result = await refreshToken();
      if (
        !result.access_token ||
        (result.access_token && result.access_token.length <= 0)
      ) {
        return;
      }

      setAuth(result);
      setShow(true);
    })();
  }, [accessToken]);

  return <>{show ? children : 
    <div className="h-[80vh] flex justify-center items-center"> <SpinnerComp /> </div>}</>;
}
