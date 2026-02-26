import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducer from '../src/store/slices/tasksSlice';
import type { Task, FilterType } from '../src/types';
import { useDashboard } from '../src/hooks/useDashboard';

describe('useDashboard', () => {
  it('should filter completed tasks', async () => {
    const mockTasks: Task[] = [
      { id: 1, todo: 'A', completed: true, userId: 1 },
      { id: 2, todo: 'B', completed: false, userId: 1 },
    ];

    const store = configureStore({
      reducer: { tasks: reducer },
      preloadedState: {
        tasks: {
          tasks: mockTasks,
          filter: 'completed' as FilterType,
          loading: false,
          error: null,
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => {
      expect(result.current.tasks.length).toBe(1);
    });
    expect(result.current.tasks[0].completed).toBe(true);
  });
});