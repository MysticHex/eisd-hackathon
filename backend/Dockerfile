# Stage 1: Build/Install
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
# If you use bun locally but want node in prod, or just npm:
RUN npm ci --only=production

COPY . .

# Stage 2: Runner
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 3000
CMD ["node", "src/server.js"]