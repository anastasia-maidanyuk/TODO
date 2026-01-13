"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { LanguageProvider } from "../context/LanguageContext"; 

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <LanguageProvider> 
        {children}
      </LanguageProvider>
    </ChakraProvider>
  );
}