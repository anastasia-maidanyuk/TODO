import React from "react";
import { VStack, Spinner } from "@chakra-ui/react";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "./EmptyState";
import { useLanguage } from "../context/LanguageContext"; 
import { Task } from "@/types/task";


interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  hasSearch: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ 
  tasks, 
  loading, 
  hasSearch, 
  onToggle, 
  onDelete 
}: TaskListProps) {
  const { t } = useLanguage(); 

  if (loading) {
    return (
      <VStack spacing={4} align="stretch" py={10}>
        <Spinner 
          alignSelf="center" 
          color="blue.500" 
          size="lg" 
          thickness="4px"
          label={t.loading} 
        />
      </VStack>
    );
  }

  if (tasks.length === 0) {
    return (
      <VStack spacing={4} align="stretch">
        <EmptyState hasSearch={hasSearch} />
      </VStack>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </VStack>
  );
}