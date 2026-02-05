FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
RUN npm install -D @types/cors
COPY . .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/index.js"]
