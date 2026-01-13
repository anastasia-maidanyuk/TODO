import axios from "axios";
import type { Task } from "../types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const tasksAPI = {
  getAll: (params: { 
    search: string; 
    status: string; 
    sort: string; 
    order: string 
  }) => axios.get<Task[]>(`${API_URL}/tasks`, { params }),
  
  create: (data: { title: string; priority: number }) =>
    axios.post<Task>(`${API_URL}/tasks`, data),
  
  delete: (id: number) =>
    axios.delete(`${API_URL}/tasks/${id}`),
  
  toggle: (id: number) =>
    axios.patch<Task>(`${API_URL}/tasks/${id}/toggle`),
};