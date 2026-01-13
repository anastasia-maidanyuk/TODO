import React, { useMemo } from "react";
import { 
  Box, IconButton, Badge, Card, CardBody, 
  Flex, Text 
} from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { useLanguage } from "../context/LanguageContext";
import { TaskCardProps } from "@/types/task";


export const TaskCard = React.memo(({ task, onToggle, onDelete }: TaskCardProps) => {
  const { t } = useLanguage(); 

  const priorityColor = useMemo(() => {
    if (task.priority >= 8) return "red";
    if (task.priority >= 5) return "yellow";
    return "blue";
  }, [task.priority]);

  return (
    <Card 
      variant="outline" 
      bg={task.isDone ? "gray.50" : "white"}
      opacity={task.isDone ? 0.7 : 1}
      borderColor={task.isDone ? "transparent" : "gray.200"}
      _hover={{ shadow: "md", borderColor: "blue.200" }}
      transition="all 0.2s"
    >
      <CardBody py={3} px={4}>
        <Flex align="center">
          <IconButton
            aria-label={t.toggleStatus} 
            icon={<CheckIcon />}
            variant={task.isDone ? "solid" : "outline"}
            colorScheme={task.isDone ? "green" : "gray"}
            borderRadius="full"
            size="sm"
            onClick={() => onToggle(task.id)}
            mr={4}
          />
          
          <Box flex="1">
            <Text 
              fontSize="lg" 
              as={task.isDone ? "s" : "span"} 
              color={task.isDone ? "gray.500" : "gray.800"}
              fontWeight="medium"
            >
              {task.title}
            </Text>
          </Box>

          <Badge 
            colorScheme={priorityColor}
            variant="subtle"
            px={2}
            borderRadius="full"
            mr={4}
          >
            {t.priorityLabel} {task.priority}
          </Badge>

          <IconButton 
            aria-label={t.deleteTask}
            icon={<DeleteIcon />} 
            variant="ghost" 
            colorScheme="red"
            onClick={() => onDelete(task.id)}
          />
        </Flex>
      </CardBody>
    </Card>
  );
});

TaskCard.displayName = "TaskCard";