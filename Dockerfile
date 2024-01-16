FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

RUN npm run build

COPY /dist .
COPY . .

RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
