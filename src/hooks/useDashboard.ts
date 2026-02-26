import { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  initializeTasks,
  syncTasks,
  setFilter,
  attachPhotoToTask,
  toggleTaskAsync
} from '../store/slices/tasksSlice';
import { FilterType } from '../types';
import { useCamera } from './useCamera';
import { Alert } from 'react-native';

export const useDashboard = () => {
  const dispatch = useAppDispatch();
  const { tasks, filter, loading } = useAppSelector(state => state.tasks);
  const { takePicture, isLoading: isCameraLoading } = useCamera();

  // 🔥 Evita doble ejecución en StrictMode
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      console.log('🚀 Initializing dashboard...');
      dispatch(initializeTasks());
      hasInitialized.current = true;
    }
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(syncTasks());
  };

  const handleToggleTask = (id: number) => {
    dispatch(toggleTaskAsync(id));
  };

  const handleFilterChange = (newFilter: FilterType) => {
    dispatch(setFilter(newFilter));
  };

  const handleAttachPhoto = async (taskId: number) => {
    const result = await takePicture();

    if (result?.uri) {
      dispatch(
        attachPhotoToTask({
          taskId,
          photoUri: result.uri,
        })
      );

      Alert.alert(
        '✅ Foto adjunta',
        'La foto se ha guardado correctamente'
      );
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  const filterOptions: Array<{ value: FilterType; label: string }> = [
    { value: 'all', label: 'Todas' },
    { value: 'completed', label: 'Completadas' },
    { value: 'pending', label: 'Pendientes' },
  ];

  return {
    tasks: filteredTasks,
    currentFilter: filter,
    isLoading: loading || isCameraLoading,
    handleRefresh,
    handleToggleTask,
    handleFilterChange,
    handleAttachPhoto,
    filterOptions,
  };
};