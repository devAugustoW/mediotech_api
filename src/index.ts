import express from 'express';
import { config } from './config/env';
import healthRoutes from './routes/health'
import { requestLogger } from './middlewares/logger';

const app = express();

// Middleware para JSON e Rotas
app.use(express.json())
app.use(requestLogger)
app.use(healthRoutes)

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    messagem: `${config.appName} rodando`
  })
})

app.listen(config.port, () => {
  console.log(`listen: ${config.appName} rodando na porta ${config.port}`)
})




