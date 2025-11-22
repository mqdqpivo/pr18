import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { createTask } from '../store/slices/tasksSlice';
import { TaskForm } from '../components/TaskForm';
import { CreateTaskDto } from '../types';

export const CreateTaskPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.tasks);

  const handleSubmit = async (data: CreateTaskDto) => {
    await dispatch(createTask(data)).unwrap();
    navigate('/tasks');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Создание задачи
          </h2>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <TaskForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitLabel="Создать"
        />
      </div>
    </div>
  );
};
