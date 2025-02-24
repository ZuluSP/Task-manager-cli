import { TaskRepository } from '../src/repository/TaskRepository';
import { Task } from '../src/models/Task';
import { promises as fs } from 'fs';
import { CONFIG } from '../src/config/config';

describe('TaskRepository', () => {
  let repository: TaskRepository;

  beforeEach(async () => {
    repository = new TaskRepository();
    await fs.writeFile(CONFIG.TASKS_FILE_PATH, JSON.stringify([]));
  });

  it('should save and retrieve tasks', async () => {
    const task = new Task('Test Task', 'Description', '2025-02-24');
    await repository.save([task]);
    const tasks = await repository.getAll();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
  });

  it('should retrieve a task by ID', async () => {
    const task = new Task('Find Task', 'Find Description', '2025-02-25');
    await repository.save([task]);
    const foundTask = await repository.getById(task.id);
    expect(foundTask).toBeDefined();
    expect(foundTask?.title).toBe('Find Task');
  });

  it('should update a task', async () => {
    const task = new Task('Update Task', 'Old Description', '2025-02-26');
    await repository.save([task]);
    task.description = 'Updated Description';
    await repository.update(task);
    const updatedTask = await repository.getById(task.id);
    expect(updatedTask?.description).toBe('Updated Description');
  });

  it('should delete a task', async () => {
    const task = new Task('Delete Task', 'To be deleted', '2025-02-27');
    await repository.save([task]);
    await repository.delete(task.id);
    const tasks = await repository.getAll();
    expect(tasks.length).toBe(0);
  });
});
