import Realm from 'realm';

export class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  id!: number;
  todo!: string;
  completed!: boolean;
  userId!: number;
  attachmentUri?: string;  // ⬅️ NUEVO
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      id: 'int',
      todo: 'string',
      completed: { type: 'bool', default: false },
      userId: 'int',
      attachmentUri: 'string?',  // ⬅️ NUEVO (opcional)
      createdAt: { type: 'date', default: () => new Date() },
    },
  };
}

export const realmConfig: Realm.Configuration = {
  schema: [Task],
  schemaVersion: 3,  // ⬅️ Incrementar versión
};