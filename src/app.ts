import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/loginRoutes';

const app = express();

app.use(express.json());

// Rotas de usuário
app.use('/api', userRoutes);

// Rotas de autenticação
app.use('/api', authRoutes);


export default app;