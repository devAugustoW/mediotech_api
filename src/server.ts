import  app from './app';
import { config } from './config/env';
import { connectDB } from './config/database';


async function startServer() {
  try {
    const isConnectedDB = await connectDB()

    if (!isConnectedDB) {
      console.error('Não foi possível conectar ao banco');
      return false;
    }

    const server = app.listen(config.port, () => {
      console.log(`${config.appName} rodando na porta ${config.port}`);
    });

    return server;

  } catch (error) {
    console.error('Não foi possível conectar ao banco');
    return false;
  }
}

startServer();