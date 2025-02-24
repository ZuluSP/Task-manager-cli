// tests/cli.e2e.test.ts
import { promises as fs } from 'fs';
import { CONFIG } from '../src/config/config';
import { spawnSync } from 'child_process';

// Helper function to remove ANSI escape codes
const removeAnsiCodes = (str: string) => str.replace(/\x1b\[[0-9;]*m/g, '');

describe('CLI End-to-End Tests', () => {
  beforeEach(async () => {
    // Reset tasks.json before each test
    await fs.writeFile(CONFIG.TASKS_FILE_PATH, JSON.stringify([]));
  });

  afterEach(async () => {
    // Clean up tasks.json after all tests
    await fs.writeFile(CONFIG.TASKS_FILE_PATH, JSON.stringify([]));
  });

  it('should add a new task via CLI', () => {
    const result = spawnSync('node', ['dist/cli.js', 'add', 'E2E Task', 'Testing CLI', '2025-02-24'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Task added:');
  });

  it('should list tasks via CLI', () => {
    spawnSync('node', ['dist/cli.js', 'add', 'E2E Task', 'Testing CLI', '2025-02-24'], { encoding: 'utf-8' });
    const result = spawnSync('node', ['dist/cli.js', 'list'], { encoding: 'utf-8' });
    expect(removeAnsiCodes(result.stdout)).toContain('E2E Task');
  });

  it('should update a task via CLI', () => {
    const addResult = spawnSync('node', ['dist/cli.js', 'add', 'Task to Update', 'Old Description', '2025-02-24'], { encoding: 'utf-8' });
    const cleanOutput = removeAnsiCodes(addResult.stdout);
    const taskIdMatch = cleanOutput.match(/id:\s*'([a-f0-9-]+)'/i);
    const taskId = taskIdMatch ? taskIdMatch[1] : null;
    expect(taskId).toBeDefined();

    spawnSync('node', ['dist/cli.js', 'update', taskId as string, '--title', 'Updated Task'], { encoding: 'utf-8' });
    const updatedResult = spawnSync('node', ['dist/cli.js', 'list'], { encoding: 'utf-8' });
    expect(removeAnsiCodes(updatedResult.stdout)).toContain('Updated Task');
  });

  it('should delete a task via CLI', () => {
    const addResult = spawnSync('node', ['dist/cli.js', 'add', 'Task to Delete', 'Will be removed', '2025-02-24'], { encoding: 'utf-8' });
    const cleanOutput = removeAnsiCodes(addResult.stdout);
    const taskIdMatch = cleanOutput.match(/id:\s*'([a-f0-9-]+)'/i);
    const taskId = taskIdMatch ? taskIdMatch[1] : null;
    expect(taskId).toBeDefined();

    spawnSync('node', ['dist/cli.js', 'delete', taskId as string], { encoding: 'utf-8' });
    const afterDeleteResult = spawnSync('node', ['dist/cli.js', 'list'], { encoding: 'utf-8' });
    expect(removeAnsiCodes(afterDeleteResult.stdout)).not.toContain('Task to Delete');
  });
});

