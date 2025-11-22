import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateTaskDto, Task } from '../types';
import { Loader2 } from 'lucide-react';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: CreateTaskDto) => Promise<void>;
  isLoading: boolean;
  submitLabel: string;
}

export const TaskForm = ({ initialData, onSubmit, isLoading, submitLabel }: TaskFormProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTaskDto>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      completed: initialData?.completed || false,
    },
  });

  const onFormSubmit = async (data: CreateTaskDto) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Заголовок
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="title"
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            } rounded-md px-3 py-2`}
            placeholder="Название задачи"
            {...register('title', { required: 'Заголовок обязателен' })}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Описание
        </label>
        <div className="mt-1">
          <textarea
            id="description"
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"
            placeholder="Подробное описание задачи"
            {...register('description')}
          />
        </div>
      </div>

      {initialData && (
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="completed"
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              {...register('completed')}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="completed" className="font-medium text-gray-700">
              Выполнено
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : submitLabel}
        </button>
      </div>
    </form>
  );
};
