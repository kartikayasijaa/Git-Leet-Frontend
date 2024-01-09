"use server";

import { AccessTokenType } from "@/constants/types";
import { REFRESH_TOKEN } from "@/constants/url";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const refreshToken = async () => {
  const cookie = cookies().get(process.env.REFRESH_COOKIE_NAME!);
  try {
    const res = await fetch(REFRESH_TOKEN, {
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      mode: "cors",
    });
    if (!res.ok) {
      cookies().delete(process.env.REFRESH_COOKIE_NAME!);
      redirect("/");
    }
    const result = (await res.json()) as AccessTokenType;
    if (result.access_token.length < 1) {
      cookies().delete(process.env.REFRESH_COOKIE_NAME!);
      redirect("/");
    }
    return result;
  } catch (error) {
    cookies().delete(process.env.REFRESH_COOKIE_NAME!);
    redirect("/");
  }
};
