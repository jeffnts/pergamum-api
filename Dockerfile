# Use a imagem oficial do Node.js LTS como base
FROM node:18-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos da aplicação para o diretório de trabalho
COPY . .

# Execute o comando 'npx prisma generate' se necessário
RUN npx prisma generate


# Exponha a porta que o Cloud Run estará ouvindo (porta padrão para HTTP)
EXPOSE 8080

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "run", "start:prod"]
