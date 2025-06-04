import  app from './app';
import { config } from './config/env';


const server = app.listen(config.port, () => {
  console.log(`${config.appName}rodando na porta ${config.port}`);
})

export default server;