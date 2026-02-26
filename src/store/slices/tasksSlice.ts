import Realm from 'realm'
import { ApiService } from '../../services/api'
import { Task, realmConfig } from '../../models/realm'
import { Task as TaskType, FilterType } from '../../types'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface TasksState {
  loading: boolean
  tasks: TaskType[]
  filter: FilterType
  error: string | null
}

const initialState: TasksState = {
  tasks: [],
  error: null,
  filter: 'all',
  loading: false,
}

const openRealm = async () => {
  return await Realm.open(realmConfig)
}

const mapRealmTasks = (realm: Realm): TaskType[] => {
  const localTasks = realm.objects<Task>('Task')
  return localTasks.map(task => ({
    id: task?.id,
    todo: task?.todo,
    userId: task?.userId,
    completed: task?.completed,
    attachmentUri: task?.attachmentUri,
  }))
}

export const initializeTasks = createAsyncThunk(
  'tasks/initialize',
  async () => {
    const realm = await openRealm()
    try {
      const localTasks = realm.objects<Task>('Task')
      if (localTasks?.length === 0) {
        const apiTasks = await ApiService.fetchTasks()
        realm.write(() => {
          apiTasks.forEach(task => {
            const existing = realm.objects<Task>('Task').filtered('id == $0', task?.id)[0]
            if (existing) {
              existing.todo = task?.todo
              existing.userId = task?.userId
              existing.completed = task?.completed
            } else {
              realm.create('Task', {
                id: task?.id,
                todo: task?.todo,
                userId: task?.userId,
                createdAt: new Date(),
                completed: task?.completed,
                _id: new Realm.BSON.ObjectId()
              })
            }
          })
        })
      }
      return mapRealmTasks(realm)
    } finally {
      realm.close()
    }
  }
)

export const syncTasks = createAsyncThunk(
  'tasks/sync',
  async () => {
    const realm = await openRealm()
    try {
      const apiTasks = await ApiService.fetchTasks()
      realm.write(() => {
        apiTasks.forEach(task => {
          const existing = realm.objects<Task>('Task').filtered('id == $0', task?.id)[0]
          if (existing) {
            existing.todo = task?.todo
            existing.userId = task?.userId
            existing.completed = task?.completed
          } else {
            realm.create('Task', {
              id: task?.id,
              todo: task?.todo,
              userId: task?.userId,
              createdAt: new Date(),
              completed: task?.completed,
              _id: new Realm.BSON.ObjectId()
            })
          }
        })
      })
      return mapRealmTasks(realm)
    } finally {
      realm.close()
    }
  }
)

export const attachPhotoToTask = createAsyncThunk(
  'tasks/attachPhoto',
  async ({ taskId, photoUri }: { taskId: number; photoUri: string }) => {
    const realm = await openRealm()
    try {
      realm.write(() => {
        const realmTask = realm.objects<Task>('Task').filtered('id == $0', taskId)[0]
        if (realmTask) {
          realmTask.attachmentUri = photoUri
        }
      })
      return { taskId, photoUri }
    } finally {
      realm.close()
    }
  }
)

export const toggleTaskAsync = createAsyncThunk(
  'tasks/toggle',
  async (taskId: number) => {
    const realm = await openRealm()
    try {
      let updatedValue = false
      realm.write(() => {
        const realmTask = realm.objects<Task>('Task').filtered('id == $0', taskId)[0]
        if (realmTask) {
          updatedValue = realmTask?.completed
          realmTask.completed = !realmTask?.completed
        }
      })
      return { taskId, completed: updatedValue }
    } finally {
      realm.close()
    }
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(initializeTasks?.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(initializeTasks?.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action?.payload
      })
      .addCase(initializeTasks?.rejected, (state, action) => {
        state.loading = false
        state.error = action?.error?.message || 'Error loading tasks'
      })
      .addCase(syncTasks?.pending, state => {
        state.loading = true
      })
      .addCase(syncTasks?.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action?.payload
      })
      .addCase(syncTasks?.rejected, (state, action) => {
        state.loading = false
        state.error = action?.error?.message || 'Error syncing tasks'
      })
      .addCase(attachPhotoToTask?.fulfilled, (state, action) => {
        const task = state?.tasks?.find(t => t?.id === action?.payload?.taskId)
        if (task) {
          task.attachmentUri = action?.payload?.photoUri
        }
      }).addCase(toggleTaskAsync?.fulfilled, (state, action) => {
        const task = state?.tasks?.find(t => t?.id === action?.payload?.taskId)
        if (task) {
          task.completed = action?.payload?.completed
        }
      })
  }
})

export const { setFilter } = tasksSlice.actions
export default tasksSlice.reducer