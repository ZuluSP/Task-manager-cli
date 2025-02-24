import { promises as fs } from 'fs';
import { Task } from '../models/Task';
import { CONFIG } from '../config/config';

export class TaskRepository {
private filePath = CONFIG.TASKS_FILE_PATH;
  async getAll(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as Task[];
    } catch (error) {
      return [];
    }
  }

  async getById(id: string): Promise<Task | undefined> {
    const tasks = await this.getAll();
    return tasks.find(task => task.id === id);
  }

  async save(tasks: Task[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
  }

  async update(updatedTask: Task): Promise<void> {
    const tasks = await this.getAll();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      await this.save(tasks);
    }
  }

  async delete(id: string): Promise<void> {
    const tasks = await this.getAll();
    const filteredTasks = tasks.filter(task => task.id !== id);
    await this.save(filteredTasks);
  }
}
