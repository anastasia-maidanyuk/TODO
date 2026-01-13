"use client";

import React, { useState } from "react";
import { Box, Container, Heading, VStack, Text, Flex } from "@chakra-ui/react"; // 1. Додали Flex
import { TaskForm } from "./TaskForm";
import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";
import { useTasks } from "../hooks/useTasks";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";

export default function TodoApp() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { tasks, loading, addTask, deleteTask, toggleTask } = useTasks(
    search,
    status,
    sortOrder
  );

  return (
    <Box minH="100vh" bg="gray.50" py={10}>
      <Container maxW="container.md"> {/* 2. Прибрали position="relative" */}
        
        {/* 3. Використовуємо Flex замість Absolute. 
           Це гарантує, що кнопка буде на тій самій лінії, що й картки нижче. */}
        <Flex justify="flex-end" mb={2}>
          <LanguageSwitcher />
        </Flex>
        
        <VStack spacing={2} mb={8} textAlign="center">
          <Heading size="2xl" color="blue.600">
            {t.title}
          </Heading>
          <Text color="gray.500">
            {t.subtitle}
          </Text>
        </VStack>

        <TaskFilters
          search={search}
          status={status}
          sortOrder={sortOrder}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onSortToggle={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
        />

        <TaskForm onAdd={addTask} />

        <TaskList
          tasks={tasks}
          loading={loading}
          hasSearch={!!search}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

      </Container>
    </Box>
  );
}