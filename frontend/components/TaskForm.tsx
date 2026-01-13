import React, { useState, useCallback } from "react";
import { HStack, Input, IconButton, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useLanguage } from "../context/LanguageContext"; 

interface TaskFormProps {
  onAdd: (title: string, priority: number) => Promise<boolean>;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const { t } = useLanguage(); 
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(5);
  const toast = useToast();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    
    if (!trimmedTitle) {
      toast({
        title: t.enterTaskTitle, 
        status: "warning",
        duration: 2000,
      });
      return;
    }

    const success = await onAdd(trimmedTitle, priority);
    if (success) {
      setTitle("");
      setPriority(5);
    }
  }, [title, priority, onAdd, toast, t]); 

  return (
    <form onSubmit={handleSubmit}>
      <HStack mb={8} spacing={4}>
        <Input 
          size="lg"
          placeholder={t.newTaskPlaceholder}
          bg="white"
          shadow="sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input 
          type="number" 
          min={1} 
          max={10} 
          w="80px" 
          size="lg"
          bg="white"
          shadow="sm"
          textAlign="center"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        />
        <IconButton 
          aria-label={t.add} 
          icon={<AddIcon />} 
          colorScheme="blue" 
          size="lg" 
          type="submit"
          shadow="md"
          isDisabled={!title.trim()}
        />
      </HStack>
    </form>
  );
}