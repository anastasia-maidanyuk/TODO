import React from "react";
import { Text } from "@chakra-ui/react";
import { useLanguage } from "../context/LanguageContext"; 

interface EmptyStateProps {
  hasSearch: boolean;
}

export function EmptyState({ hasSearch }: EmptyStateProps) {
  const { t } = useLanguage(); 

  return (
    <Text textAlign="center" color="gray.400" py={10}>
      {hasSearch ? t.nothingFound : t.emptyListShort}
    </Text>
  );
}