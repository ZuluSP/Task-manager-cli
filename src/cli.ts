import { Command } from 'commander';
import { TaskService } from './services/TaskService';

const program = new Command();
const taskService = new TaskService();

program
  .name('taskManager')
  .description('Simple CLI Task Manager')
  .version('1.0.0');

// Command: This is for adding a new task
program
  .command('add')
  .description('Add a new task')
  .argument('<title>', 'Task title')
  .argument('<description>', 'Task description')
  .argument('<dueDate>', 'Due date in YYYY-MM-DD format')
  .action(async (title, description, dueDate) => {
    const task = await taskService.createTask(title, description, dueDate);
    console.log('Task added:', task);
  });

// Command: This is for listing all tasks
program
  .command('list')
  .description('List all tasks')
  .action(async () => {
    const tasks = await taskService.listTasks();
    console.table(tasks);
  });

// Command: this is for updating a task
program
  .command('update')
  .description('Update an existing task')
  .argument('<id>', 'Task ID')
  .option('--title <title>', 'New title')
  .option('--description <description>', 'New description')
  .option('--dueDate <dueDate>', 'New due date (YYYY-MM-DD)')
  .option('--status <status>', 'Task status (pending/completed)')
  .action(async (id, options) => {
    await taskService.updateTask(id, options);
    console.log(`Task ${id} updated successfully.`);
  });

// Command: This is for deleting a task
program
  .command('delete')
  .description('Delete a task')
  .argument('<id>', 'Task ID')
  .action(async (id) => {
    await taskService.deleteTask(id);
    console.log(`Task ${id} deleted successfully.`);
  });

program.parse(process.argv);
