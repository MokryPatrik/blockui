# Multi-stage build for frontend + backend on Fly.io

# Backend stage
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/src ./src
COPY backend/tsconfig.json ./
RUN npm run build

# Frontend stage
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend . 
RUN npm run build

# Final production image
FROM node:20-alpine
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder /app/backend/package*.json ./backend/

# Copy frontend
COPY --from=frontend-builder /app/frontend/.next ./.next
COPY --from=frontend-builder /app/frontend/node_modules ./frontend/node_modules
COPY --from=frontend-builder /app/frontend/package*.json ./frontend/
COPY --from=frontend-builder /app/frontend/public ./frontend/public

ENV NODE_ENV=production
EXPOSE 5000 3000

# Start script
RUN echo '#!/bin/sh\ncd /app/backend && node dist/index.js &\ncd /app/frontend && npm start' > /start.sh && chmod +x /start.sh

ENTRYPOINT ["dumb-init", "--"]
CMD ["/start.sh"]
