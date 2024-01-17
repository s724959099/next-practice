"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface NextAuthSessionProviderProps {
  children: ReactNode;
}

export default function NextAuthSessionProvider({ children }: NextAuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}