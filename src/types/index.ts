export interface Task {
  id: number
  todo: string
  userId: number
  completed: boolean
  attachmentUri?: string
}

export type FilterType = 'all' | 'completed' | 'pending'

export interface CameraResult {
  uri: string
  size?: number
  width?: number
  height?: number
  fileName?: string
}