"use client";
import { AccessTokenType } from "@/constants/types";
import { BASE_URL, REFRESH_COOKIE_NAME, REFRESH_TOKEN } from "@/constants/url";
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
    if (accessToken && accessToken.length > 1) {
      setShow(true);
      return;
    }
    (async () => {
      try{
        const res = await fetch(REFRESH_TOKEN, {
          cache: 'no-store',
          credentials: 'include',
          mode: 'cors'
        });
        if (!res.ok){
          throw new Error("Error fetching User Information")
        }
        const result = (await res.json() as AccessTokenType)
        setAuth(result);
        setShow(true);
      } catch (err) {
        router.push('/')
        console.log(err)
      }
    })();
  }, [accessToken]);

  return <>{show ? children : 
    <div className="h-[80vh] flex justify-center items-center"> <SpinnerComp /> </div>}</>;
}
