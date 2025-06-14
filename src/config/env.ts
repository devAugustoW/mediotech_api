import dotenv from 'dotenv';

dotenv.config();

export const config = {
  appName: String(process.env.APP_NAME) || 'API',
  port: Number(process.env.PORT) || 8080,
  databaseURL: String(process.env.DATABASE_URL),
  jwtSecret: String(process.env.JWT_SECRET)
}