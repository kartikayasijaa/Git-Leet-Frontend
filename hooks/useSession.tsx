"use client"

import { AuthContextType } from "@/constants/types";
import { SessionContext } from "@/context/SessionContext";
import { useContext } from "react"

function useSession() {
  return useContext(SessionContext) as AuthContextType;
}

export default useSession