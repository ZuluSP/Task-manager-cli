import { Task } from '../src/models/Task';

describe('Task Model', () => {
  it('should create a Task instance with given values', () => {
    const task = new Task('Test Title', 'Test Description', '2025-02-24');
    expect(task.title).toBe('Test Title');
    expect(task.description).toBe('Test Description');
    expect(task.dueDate).toBe('2025-02-24');
    expect(task.status).toBe('pending');
    expect(task.id).toBeDefined();
  });

  it('should allow setting a custom status', () => {
    const task = new Task('Another Task', 'Description', '2025-02-24', undefined, 'completed');
    expect(task.status).toBe('completed');
  });

  it('should generate a unique id if not provided', () => {
    const task1 = new Task('Task 1', 'Desc', '2025-02-24');
    const task2 = new Task('Task 2', 'Desc', '2025-02-24');
    expect(task1.id).not.toBe(task2.id);
  });
});