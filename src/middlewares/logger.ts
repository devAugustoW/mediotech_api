import { Request, Response, NextFunction } from 'express';

// middleware de log para todas as requisiçoes
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const timeStamps = new Date().toISOString()
  const { method, url, body }  = req
  const { statusCode } = res

  console.log(`${timeStamps}, ${method}, ${url}, ${statusCode}`)

  next()
}
