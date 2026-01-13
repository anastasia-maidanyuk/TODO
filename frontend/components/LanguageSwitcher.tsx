import React from "react";
import { HStack, Button } from "@chakra-ui/react";
import { useLanguage } from "../context/LanguageContext";

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <HStack 
      spacing={0} 
      bg="gray.200" 
      p={1} 
      borderRadius="full" 
      border="1px solid" 
      borderColor="gray.300"
    >
      <Button
        size="xs"
        borderRadius="full"
        variant={lang === "uk" ? "solid" : "ghost"}
        bg={lang === "uk" ? "white" : "transparent"}
        color={lang === "uk" ? "blue.600" : "gray.500"}
        shadow={lang === "uk" ? "sm" : "none"}
        _hover={{ bg: lang === "uk" ? "white" : "gray.300" }}
        onClick={() => setLang("uk")}
        px={3}
      >
        UA
      </Button>
      
      <Button
        size="xs"
        borderRadius="full"
        variant={lang === "en" ? "solid" : "ghost"}
        bg={lang === "en" ? "white" : "transparent"}
        color={lang === "en" ? "blue.600" : "gray.500"}
        shadow={lang === "en" ? "sm" : "none"}
        _hover={{ bg: lang === "en" ? "white" : "gray.300" }}
        onClick={() => setLang("en")}
        px={3}
      >
        EN
      </Button>
    </HStack>
  );
};