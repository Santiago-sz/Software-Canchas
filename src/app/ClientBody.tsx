"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
