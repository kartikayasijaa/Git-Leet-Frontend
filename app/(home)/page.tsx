import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { REFRESH_COOKIE_NAME } from "@/constants/url";

export default function Home() {
  const cookie = cookies()
  const token = cookie.get(REFRESH_COOKIE_NAME)
  if(token && token.value.length > 1) {
    redirect('/user')
  }
  return (
    <main className="">
      Contents
    </main >
  )
}
