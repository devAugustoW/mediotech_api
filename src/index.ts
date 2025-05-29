import express from 'express';
import { config } from './config/env';

const app = express();

// Middleware para aceitar JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: "🎉 Mediotech API funcionando!",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '✅ API saudável e funcionando!',
    port: config.port
  });
});

app.listen(config.port, () => {
  console.log(`🚀 Servidor Mediotech rodando em http://localhost:${config.port}`);
  console.log(`🌍 Ambiente: ${config.nodeEnv}`);
});