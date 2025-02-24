import * as dotenv from 'dotenv';

// This loads environment variables from the .env file
dotenv.config();

export const CONFIG = {
  /**
   * The file path where tasks are stored.
   * This can be set via an environment variable or (in this case) defaults to './data/tasks.json'.
   */
  TASKS_FILE_PATH: process.env.TASKS_FILE_PATH || './data/tasks.json',
};

