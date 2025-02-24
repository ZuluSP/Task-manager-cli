import { Task } from '../models/Task';
import { TaskRepository } from '../repository/TaskRepository';
import { v4 as uuidv4 } from 'uuid';

export class TaskService {
  private repository = new TaskRepository();

  async createTask(title: string, description: string, dueDate: string): Promise<Task> {
    const tasks = await this.repository.getAll();
    const newTask = new Task(title, description, dueDate, uuidv4(), 'pending');
    tasks.push(newTask);
    await this.repository.save(tasks);
    return newTask;
  }

  async listTasks(): Promise<Task[]> {
    return this.repository.getAll();
  }

  async updateTask(id: string, fieldsToUpdate: Partial<Omit<Task, 'id'>>): Promise<void> {
    const task = await this.repository.getById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }

    const updatedTask = { ...task, ...fieldsToUpdate };
    await this.repository.update(updatedTask);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.repository.getById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    
    await this.repository.delete(id);
  }
}
