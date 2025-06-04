import express from 'express';
import { config } from './config/env';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    route: '/',
    menssage: 'API rodando'
  })
})


export default app;