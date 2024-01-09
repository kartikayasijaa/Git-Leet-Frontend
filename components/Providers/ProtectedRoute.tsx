'use client'
import { refreshToken } from '@/app/actions';
import { AccessTokenType } from '@/constants/types';
import { REFRESH_TOKEN } from '@/constants/url';
import useSession from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { accessToken, setAuth } = useSession()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (accessToken && accessToken.length > 1) {
      setShow(true)
      return
    }
    (async()=>{
      const result = await refreshToken()
      setAuth(result)
      setShow(true)
    })()
    // (async () => {
    //   try {
    //     const res = await fetch(REFRESH_TOKEN, {
    //       credentials: 'include',
    //       mode: 'cors',
    //     })
    //     if (!res.ok) {
    //       router.push('/')
    //     }
    //     const result = await res.json() as AccessTokenType
    //     if (result.access_token.length < 1) {
    //       router.push('/')
    //     }
    //     setAuth(result)
    //     setShow(true)
    //   } catch (error) {
    //     router.push('/')
    //   }
    // })()
  }, [accessToken])

  return <>{show ? children : "loading"}</>
}