import dotenv from 'dotenv';
dotenv.config();

export function getEnv(variable) {
  const value = process.env[variable];
  if (typeof value === 'undefined') {
    console.warn(`Seems like the variable "${variable}" is not set in the environment. 
    Did you forget to execute "cp .env.example .env" and adjust variables in the .env file to match your own environment ?`);
  }
  return value;
}

export const SERVER_PORT = getEnv('SERVER_PORT');
