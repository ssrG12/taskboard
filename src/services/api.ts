import axios from 'axios';
import { Task } from '../types';

const API_URL = 'https://dummyjson.com/todos';

export const ApiService = {
  async fetchTasks(): Promise<Task[]> {
    const response = await axios.get(API_URL);
    return response.data.todos || [];
  }
};