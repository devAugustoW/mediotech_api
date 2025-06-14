# API Mediotech

API RESTful para plataforma educacional desenvolvida com TypeScript e PostgreSQL.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express** 
- **Prisma ORM** 
- **PostgreSQL** 
- **JWT** 
- **Bcrypt** 

## 📋 Funcionalidades

### Usuários
- **Coordenador**: Gerencia usuários, turmas e disciplinas
- **Professor**: Lança notas e cria comunicados
- **Aluno**: Visualiza notas e responde atividades

### Sistema
- Autenticação JWT
- CRUD de usuários
- Gestão de turmas e disciplinas
- Sistema de notas (2 atividades por disciplina)
- Comunicados e notificações

## 🛠️ Instalação

### Clone o repositório
git clone https://github.com/devAugustoW/mediotech_api.git

### Instale as dependências
npm install

### Configure as variáveis de ambiente
cp .env.example .env

```env
APP_NAME="API Mediotech"
DATABASE_URL="postgresql://user:password@localhost:5432/mediotech"
JWT_SECRET="sua_chave_secreta_jwt"
PORT=3000
```

# Execute as migrations
npm run db:migrate

# Gere o Prisma Client
npm run db:generate

# Inicie o servidor
npm run dev

## 🔗 Endpoints Principais

### Autenticação
- `POST /api/login` - Login de usuário

### Usuários
- `POST /api/users` - Criar usuário
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

## 📊 Estrutura do Banco

- **User** - Usuários do sistema
- **Classes** - Turmas
- **Disciplines** - Disciplinas
- **Activities** - Atividades
- **Grades** - Notas
- **Announcements** - Comunicados

## 📄 Projeto em desenvolvimento

Desenvolvido por Augusto Dantas
