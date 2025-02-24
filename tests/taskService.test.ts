import { TaskService } from '../src/services/TaskService';
import { TaskRepository } from '../src/repository/TaskRepository';
import { Task } from '../src/models/Task';

// I use a repository mock to not invade responsabilities. In a real enviroment this is totally necessary.
jest.mock('../src/repository/TaskRepository');

describe('TaskService', () => {
  let service: TaskService;
  let repositoryMock: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    repositoryMock = new TaskRepository() as jest.Mocked<TaskRepository>;
    service = new TaskService();
    (service as any).repository = repositoryMock;
  });

  it('should create a task', async () => {
    // Used to avoid these methods.
    repositoryMock.getAll.mockResolvedValue([]);
    repositoryMock.save.mockResolvedValue();
  
    const task = await service.createTask('New Task', 'Test Description', '2025-02-24');
  
    expect(task.title).toBe('New Task');
    expect(task.description).toBe('Test Description');
    expect(task.dueDate).toBe('2025-02-24');
    expect(task.status).toBe('pending');
    expect(repositoryMock.save).toHaveBeenCalled();
  });
  

  it('should list all tasks', async () => {
    const tasks = [new Task('Task 1', 'Description', '2025-02-24'), new Task('Task 2', 'Description 2', '2025-02-25'),  new Task('Task 3', 'Description 3', '2025-02-26')];
    repositoryMock.getAll.mockResolvedValue(tasks);

    const result = await service.listTasks();
    expect(result).toEqual(tasks);
  });

  it('should update a task', async () => {
    const task = new Task('Task to Update', 'Old Description', '2025-02-24');
    repositoryMock.getById.mockResolvedValue(task);
    repositoryMock.update.mockResolvedValue();

    await service.updateTask(task.id, { description: 'Updated Description' });

    expect(repositoryMock.update).toHaveBeenCalledWith(expect.objectContaining({ description: 'Updated Description' }));
  });

  it('should throw an error when updating a non-existent task', async () => {
    repositoryMock.getById.mockResolvedValue(undefined);

    await expect(service.updateTask('invalid-id', { description: 'New Description' }))
      .rejects
      .toThrow('Task with ID invalid-id not found');
  });

  it('should delete a task', async () => {
    const task = new Task('Task to Delete', 'Description', '2025-02-24');
    repositoryMock.getById.mockResolvedValue(task);
    repositoryMock.delete.mockResolvedValue();

    await service.deleteTask(task.id);

    expect(repositoryMock.delete).toHaveBeenCalledWith(task.id);
  });

  it('should throw an error when deleting a non-existent task', async () => {
    repositoryMock.getById.mockResolvedValue(undefined);

    await expect(service.deleteTask('invalid-id'))
      .rejects
      .toThrow('Task with ID invalid-id not found');
  });
});
