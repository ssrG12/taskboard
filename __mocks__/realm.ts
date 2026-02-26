class MockRealmObject { }

let mockTasks: any[] = [];

const mockRealmInstance = {
  objects: jest.fn(() => ({
    length: mockTasks.length,
    map: (cb: any) => mockTasks.map(cb),
    filtered: (_: string, id: number) =>
      mockTasks.filter(t => t.id === id),
  })),
  write: (cb: Function) => cb(),
  create: (_: string, obj: any) => mockTasks.push(obj),
  close: jest.fn(),
};

const Realm = {
  open: jest.fn(() => Promise.resolve(mockRealmInstance)),
  BSON: {
    ObjectId: jest.fn(() => 'mock-id'),
  },
  Object: MockRealmObject,
};

export default Realm;