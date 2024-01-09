import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  const cookie = cookies()
  const token = cookie.get(process.env.REFRESH_COOKIE_NAME!)
  if(token && token.value.length > 1) {
    redirect('/user')
  }
  return (
    <main className="">
      Contents
    </main >
  )
}
