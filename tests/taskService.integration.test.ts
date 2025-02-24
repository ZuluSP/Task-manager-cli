import { TaskService } from '../src/services/TaskService';
import { TaskRepository } from '../src/repository/TaskRepository';
import { promises as fs } from 'fs';
import { CONFIG } from '../src/config/config';

describe('TaskService Integration Tests', () => {
  let service: TaskService;
  let repository: TaskRepository;

  beforeEach(async () => {
    repository = new TaskRepository();
    service = new TaskService();
    // I reset tasks.json before each test
    await fs.writeFile(CONFIG.TASKS_FILE_PATH, JSON.stringify([])); 
  });

  it('should create and retrieve a task', async () => {
    const newTask = await service.createTask('Integration Test', 'Testing service with repository', '2025-02-24');
    const tasks = await service.listTasks();
    
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(newTask.id);
    expect(tasks[0].title).toBe('Integration Test');
  });

  it('should update a task and retrieve the updated version', async () => {
    const task = await service.createTask('Old Title', 'Old Description', '2025-03-01');
    await service.updateTask(task.id, { title: 'New Title' });
    const updatedTask = await repository.getById(task.id);
    
    expect(updatedTask).toBeDefined();
    expect(updatedTask?.title).toBe('New Title');
  });

  it('should delete a task and ensure it is removed', async () => {
    const task = await service.createTask('Task to Delete', 'Will be removed', '2025-03-01');
    await service.deleteTask(task.id);
    const tasks = await service.listTasks();
    
    expect(tasks.length).toBe(0);
  });
});

