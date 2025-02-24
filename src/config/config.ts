import * as dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  TASKS_FILE_PATH: process.env.TASKS_FILE_PATH || './data/tasks.json',
};
