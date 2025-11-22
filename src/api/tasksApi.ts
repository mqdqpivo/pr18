import axiosInstance from './axiosInstance';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types';

export const tasksApi = {
  getAll: async () => {
    const response = await axiosInstance.get<Task[]>('/tasks');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await axiosInstance.get<Task>(`/tasks/${id}`);
    return response.data;
  },
  create: async (data: CreateTaskDto) => {
    const newTask = {
      ...data,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const response = await axiosInstance.post<Task>('/tasks', newTask);
    return response.data;
  },
  update: async (id: string, data: UpdateTaskDto) => {
    const response = await axiosInstance.patch<Task>(`/tasks/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    await axiosInstance.delete(`/tasks/${id}`);
  },
};
