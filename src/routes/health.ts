import { Router } from 'express';
import { config } from '../config/env';

// Inicializar Router
const router = Router()

// Rota de GET simples
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    messege: `Mediotech API Funcionando!`,
    timestamp: new Date().toISOString()
  })
})

// Rota GET detalhada
router.get('/health/detail', (req, res) => {
  res.json({
    status: 'ok',
    api: `${config.appName}`,
    timeStamp: new Date().toISOString()
  })
})

// exportar Router
export default router;