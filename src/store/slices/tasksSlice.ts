import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { tasksApi } from '../../api/tasksApi';
import { Task, CreateTaskDto, UpdateTaskDto } from '../../types';

interface TasksState {
  items: Task[];
  isLoading: boolean;
  error: string | null;
  filter: 'all' | 'completed' | 'active';
  searchQuery: string;
}

const initialState: TasksState = {
  items: [],
  isLoading: false,
  error: null,
  filter: 'all',
  searchQuery: '',
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const response = await tasksApi.getAll();
  return response;
});

export const createTask = createAsyncThunk('tasks/create', async (data: CreateTaskDto) => {
  const response = await tasksApi.create(data);
  return response;
});

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, data }: { id: string; data: UpdateTaskDto }) => {
    const response = await tasksApi.update(id, data);
    return response;
  }
);

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await tasksApi.delete(id);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'active'>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      // Create
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setFilter, setSearchQuery } = tasksSlice.actions;
export default tasksSlice.reducer;
