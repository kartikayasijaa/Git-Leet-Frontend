"use client"
import { AccessTokenType, AuthContextType, UserType, initialUser } from "@/constants/types";
import { createContext, useState } from "react";


export const SessionContext = createContext<AuthContextType | undefined>(undefined)

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState("");
  const [loading, setFetching] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserType>(initialUser)
  const setAuth = (r: AccessTokenType) => {
    setAccessToken(r.access_token);
    setIsAuthenticated(true)
    setUser(r.user)
  };
  const setLeetcode = (leetcode_username: string) => {
    setUser((prev) => ({ ...prev, leetcode_username }))
  }
  const clearAuth = () => {
    setAccessToken("");
    setUser(initialUser)
  };
  const setLoading = (l: boolean) => {
    setFetching(l)
  }
  const setGithub = (github: string) => {
    setUser(prev => ({...prev, github_repo: github}))
  }

  const value: AuthContextType = {
    accessToken,
    setAuth,
    clearAuth,
    loading,
    setLoading,
    isAuthenticated,
    user,
    setLeetcode,
    setGithub
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}

