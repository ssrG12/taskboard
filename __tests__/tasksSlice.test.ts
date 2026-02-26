import reducer, {
  setFilter,
  initializeTasks,
  attachPhotoToTask,
  toggleTaskAsync,
} from '../src/store/slices/tasksSlice';

import { configureStore } from '@reduxjs/toolkit';
import type { Task, FilterType } from '../src/types';

/* ===============================
   MOCK REALM
================================ */

let mockTasks: Task[] = [];

/* ===============================
   MOCK API
================================ */

jest.mock('../src/services/api.ts', () => ({
  ApiService: {
    fetchTasks: jest.fn(() =>
      Promise.resolve<Task[]>([
        {
          id: 1,
          todo: 'Test task',
          completed: false,
          userId: 1,
        },
      ])
    ),
  },
}));

/* ===============================
   TYPES
================================ */

interface TasksState {
  tasks: Task[];
  filter: FilterType;
  loading: boolean;
  error: string | null;
}

/* ===============================
   TESTS
================================ */

describe('tasksSlice reducer', () => {
  const initialState: TasksState = {
    tasks: [],
    filter: 'all',
    loading: false,
    error: null,
  };

  beforeEach(() => {
    mockTasks = [];
  });

  it('should change filter', () => {
    const state = reducer(initialState, setFilter('completed'));
    expect(state.filter).toBe('completed');
  });

  it('should fetch from API if realm is empty', async () => {
    const store = configureStore({
      reducer: { tasks: reducer },
    });

    await store.dispatch(initializeTasks() as any);

    const state = store.getState().tasks as TasksState;

    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0].todo).toBe('Test task');
  });

  it('should toggle task completed state', async () => {
    mockTasks = [
      {
        id: 1,
        todo: 'Task',
        completed: false,
        userId: 1,
      },
    ];

    const preloadedState: { tasks: TasksState } = {
      tasks: {
        tasks: mockTasks,
        filter: 'all',
        loading: false,
        error: null,
      },
    };

    const store = configureStore({
      reducer: { tasks: reducer },
      preloadedState,
    });

    await store.dispatch(toggleTaskAsync(1) as any);

    const state = store.getState().tasks as TasksState;

    expect(state.tasks[0].completed).toBe(true);
  });

  it('should attach photo to task', async () => {
    mockTasks = [
      {
        id: 1,
        todo: 'Task',
        completed: false,
        userId: 1,
      },
    ];

    const preloadedState: { tasks: TasksState } = {
      tasks: {
        tasks: mockTasks,
        filter: 'all',
        loading: false,
        error: null,
      },
    };

    const store = configureStore({
      reducer: { tasks: reducer },
      preloadedState,
    });

    await store.dispatch(
      attachPhotoToTask({ taskId: 1, photoUri: 'file://photo.jpg' }) as any
    );

    const state = store.getState().tasks as TasksState;

    expect(state.tasks[0].attachmentUri).toBe('file://photo.jpg');
  });
});