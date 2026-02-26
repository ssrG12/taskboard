import Realm from 'realm'

export class Task extends Realm.Object<Task> {
  id!: number
  todo!: string
  userId!: number
  createdAt!: Date
  completed!: boolean
  attachmentUri?: string
  _id!: Realm.BSON.ObjectId

  static schema: Realm.ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      id: 'int',
      userId: 'int',
      todo: 'string',
      attachmentUri: 'string?',
      completed: { type: 'bool', default: false },
      createdAt: { type: 'date', default: () => new Date() },
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() }
    }
  }
}

export const realmConfig: Realm.Configuration = {
  schema: [Task],
  schemaVersion: 3
}