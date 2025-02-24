import { TaskService } from './services/TaskService';

(async () => {
  const service = new TaskService();

  // HBere we create a task
  const task = await service.createTask('Test Task', 'This is a test', '2025-01-01');
  console.log('Task Created:', task);

  // We list all the tasks
  console.log('All Tasks:', await service.listTasks());

  // Update one task
  await service.updateTask(task.id, { status: 'completed' });
  console.log('Updated Task:', await service.listTasks());

  // Delete one task
  await service.deleteTask(task.id);
  console.log('All Tasks after Deletion:', await service.listTasks());
})();
