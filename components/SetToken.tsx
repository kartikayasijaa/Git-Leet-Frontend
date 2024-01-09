'use client'
import { useRouter } from 'next/navigation';
import { REFRESH_TOKEN } from '@/constants/url';
import { AccessTokenType } from '@/constants/types';
import { useEffect } from 'react';


export default function SetToken() {
  const router = useRouter()
  useEffect(() => {
    const token = sessionStorage.getItem("GIT_LEET_ACCESS_TOKEN")
    if (token && token.length > 1) {
      return
    }
    (async () => {
      try {
        const res = await fetch(REFRESH_TOKEN, {
          credentials: 'include',
          mode: 'cors',
        })
        if (!res.ok) {
          router.push('/login')
        }
        const result = await res.json() as AccessTokenType
        if (result.access_token.length < 1) {
          router.push('/login')
        }
        sessionStorage.setItem("GIT_LEET_ACCESS_TOKEN", result.access_token)
      } catch (error) {
        router.push('/login')
      }
    })()
  }, [])

  return <></>
}