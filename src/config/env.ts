import dotenv from 'dotenv'

// Carrega as variáveis do arquivo .env
dotenv.config()

// Organizamos e validamos as variáveis de ambiente
export const config = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || ''
}

// Validações de segurança
if (!process.env.JWT_SECRET) {
  throw new Error('❌ JWT_SECRET é obrigatório no arquivo .env!')
}

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL é obrigatório no arquivo .env!')
}

console.log('✅ Variáveis de ambiente carregadas com sucesso!') 