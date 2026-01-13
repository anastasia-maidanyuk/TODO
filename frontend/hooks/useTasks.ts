import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { tasksAPI } from "../api/tasks";
import type { Task } from "../types/task";

export function useTasks(
  search: string,
  status: string,
  sortOrder: "asc" | "desc"
) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchTasks = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await tasksAPI.getAll({
        search,
        status,
        sort: "priority",
        order: sortOrder,
      });
      
      if (!signal?.aborted) {
        setTasks(res.data);
      }
    } catch (error) {
      if (!axios.isCancel(error) && !signal?.aborted) {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Помилка завантаження",
          status: "error",
          duration: 2000,
        });
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [search, status, sortOrder, toast]);

  useEffect(() => {
    const abortController = new AbortController();
    const timer = setTimeout(() => {
      fetchTasks(abortController.signal);
    }, 300);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [fetchTasks]);

  const addTask = useCallback(async (title: string, priority: number) => {
    try {
      await tasksAPI.create({ title, priority });
      fetchTasks();
      
      toast({
        title: "Завдання додано",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      return true;
    } catch (error) {
      console.error("Error adding task:", error);
      toast({
        title: "Помилка додавання",
        status: "error",
        duration: 2000,
      });
      return false;
    }
  }, [fetchTasks, toast]);

  const deleteTask = useCallback(async (id: number) => {
    const previousTasks = [...tasks];
    setTasks(prev => prev.filter(t => t.id !== id));
    
    try {
      await tasksAPI.delete(id);
    } catch (error) {
      console.error("Error deleting task:", error);
      setTasks(previousTasks);
      toast({
        title: "Помилка видалення",
        status: "error",
        duration: 2000,
      });
    }
  }, [tasks, toast]);

  const toggleTask = useCallback(async (id: number) => {
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, isDone: !t.isDone } : t
    ));
    
    try {
      await tasksAPI.toggle(id);
    } catch (error) {
      console.error("Error toggling task:", error);
      setTasks(previousTasks);
      toast({
        title: "Помилка оновлення",
        status: "error",
        duration: 2000,
      });
    }
  }, [tasks, toast]);

  return {
    tasks,
    loading,
    addTask,
    deleteTask,
    toggleTask,
  };
}