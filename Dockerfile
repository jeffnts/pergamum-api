FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY /prisma /prisma

RUN npm install

COPY . .

RUN npm run build 

RUN npm prune --production

RUN npx prisma generate

FROM node:18-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
