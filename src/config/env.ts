import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3333,
  appName: String(process.env.APP_NAME) || 'API',
}