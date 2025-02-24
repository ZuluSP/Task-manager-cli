import { promises as fs } from 'fs';
import { Task } from '../models/Task';
import { CONFIG } from '../config/config';

export class TaskRepository {
  private filePath = CONFIG.TASKS_FILE_PATH;

  /**
   * Retrieves all tasks from the JSON file.
   * @returns A list of all tasks or an empty array if an error occurs.
   */
  async getAll(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as Task[];
    } catch (error) {
      return [];
    }
  }

  /**
   * Finds a task by its ID
   * @param id - The ID of the task to retrieve.
   * @returns The found task or undefined if not found.
   */
  async getById(id: string): Promise<Task | undefined> {
    const tasks = await this.getAll();
    return tasks.find(task => task.id === id);
  }

  /**
   * Saves a list of tasks to the JSON file.
   * @param tasks - The array of tasks to be saved.
   */
  async save(tasks: Task[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
  }

  /**
   * Updates an existing task by replacing it with the updated task.
   * @param updatedTask - The task with updated information.
   */
  async update(updatedTask: Task): Promise<void> {
    const tasks = await this.getAll();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      await this.save(tasks);
    }
  }

  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task to delete.
   */
  async delete(id: string): Promise<void> {
    const tasks = await this.getAll();
    const filteredTasks = tasks.filter(task => task.id !== id);
    await this.save(filteredTasks);
  }
}
