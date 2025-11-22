export interface User {
  id: number | string;
  username: string;
  email?: string;
  name?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}
