export class Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';

  /**
   * Creates a new task instance.
   * @param title - The title of the task.
   * @param description - A brief description of the task.
   * @param dueDate - The due date of the task in YYYY-MM-DD format.
   * @param id - (Optional) A unique identifier for the task; auto-generated if not provided.
   * @param status - The status of the task, defaulting to 'pending'.
   */
  constructor(title: string, description: string, dueDate: string, id?: string, status: 'pending' | 'completed' = 'pending') {
    this.id = id || crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
  }
}