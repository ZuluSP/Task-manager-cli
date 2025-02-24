import { Task } from '../models/Task';
import { TaskRepository } from '../repository/TaskRepository';
import { v4 as uuidv4 } from 'uuid';

export class TaskService {
  private repository = new TaskRepository();

  /**
   * Creates a new task and saves it to the repository.
   * @param title - The title of the task.
   * @param description - The description of the task.
   * @param dueDate - The due date of the task in YYYY-MM-DD format
   * @returns The newly created task.
   */
  async createTask(title: string, description: string, dueDate: string): Promise<Task> {
    const tasks = await this.repository.getAll();
    const newTask = new Task(title, description, dueDate, uuidv4(), 'pending');
    tasks.push(newTask);
    await this.repository.save(tasks);
    return newTask;
  }

  /**
   * Retrieves all tasks from the repository.
   * @returns A list of all tasks.
   */
  async listTasks(): Promise<Task[]> {
    return this.repository.getAll();
  }

  /**
   * Updates a specific task by its ID.
   * @param id - The ID of the task to update.
   * @param fieldsToUpdate - An object containing the fields to update.
   * @throws Error if the task with the given ID is not found.
   */
  async updateTask(id: string, fieldsToUpdate: Partial<Omit<Task, 'id'>>): Promise<void> {
    const task = await this.repository.getById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }

    const updatedTask = { ...task, ...fieldsToUpdate };
    await this.repository.update(updatedTask);
  }

  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task to delete.
   * @throws Error if the task with the given ID is not found.
   */
  async deleteTask(id: string): Promise<void> {
    const task = await this.repository.getById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    
    await this.repository.delete(id);
  }
}
