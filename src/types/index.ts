export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  attachmentUri?: string;  // ⬅️ NUEVO
}

export type FilterType = 'all' | 'completed' | 'pending';

export interface CameraResult {  // ⬅️ NUEVO
  uri: string;
  fileName?: string;
  width?: number;
  height?: number;
  size?: number;
}