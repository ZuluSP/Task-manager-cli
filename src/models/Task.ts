export class Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'completed';
  
    constructor(title: string, description: string, dueDate: string, id?: string, status: 'pending' | 'completed' = 'pending') {
      this.id = id || crypto.randomUUID();
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.status = status;
    }
  }
  