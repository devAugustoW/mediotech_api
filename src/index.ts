import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME;

app.get('/', (req, res) => {
  res.json({
    message: `${APP_NAME} funcionando!`,
  })
})

app.listen(PORT, () => {
  console.log(`${APP_NAME} rodando em http://localhost:${PORT}`);
})