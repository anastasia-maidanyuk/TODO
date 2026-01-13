import React from "react";
import { 
  Box, Button, Card, CardBody, Flex, 
  HStack, Input, Select 
} from "@chakra-ui/react";
import { Search, ArrowUpNarrowWide, ArrowDownNarrowWide } from "lucide-react";
import { useLanguage } from "../context/LanguageContext"; 

interface TaskFiltersProps {
  search: string;
  status: string;
  sortOrder: "asc" | "desc";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortToggle: () => void;
}

export function TaskFilters({
  search,
  status,
  sortOrder,
  onSearchChange,
  onStatusChange,
  onSortToggle,
}: TaskFiltersProps) {
  const { t } = useLanguage();

  return (
    <Card mb={6} shadow="md" borderRadius="xl">
      <CardBody>
        <Flex direction={{ base: "column", md: "row" }} gap={4}>
          <HStack w="full">
            <Box as={Search} color="gray.400" flexShrink={0} />
            <Input 
              placeholder={t.searchPlaceholder}
              variant="filled"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </HStack>
          
          <HStack w={{ base: "full", md: "auto" }} flexShrink={0}>
            <Select 
              value={status} 
              onChange={(e) => onStatusChange(e.target.value)}
              w={{ base: "full", md: "150px" }}
            >
              <option value="all">{t.all}</option>      
              <option value="done">{t.done}</option>     
              <option value="undone">{t.undone}</option> 
            </Select>

            <Button 
              onClick={onSortToggle}
              leftIcon={sortOrder === "asc" ? <ArrowUpNarrowWide size={16}/> : <ArrowDownNarrowWide size={16}/>}
              flexShrink={0}
            >
              {t.priority} 
            </Button>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
}