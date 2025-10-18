# ---------- Build stage ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
# Faster and more reproducible than npm install
RUN npm ci || npm install --force

# Copy the rest and build
COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM node:18-alpine AS runner
WORKDIR /app

# PM2 + curl for healthcheck
RUN npm install -g pm2 && apk add --no-cache curl

# Copy only what’s needed for runtime
COPY package*.json ./
# Install only production dependencies
RUN npm ci --omit=dev || npm install --omit=dev --force

# Bring over the build output
COPY --from=builder /app/.next ./.next/
COPY --from=builder /app/public ./public/
# Optional: copy next.config.ts if it exists
COPY --from=builder /app/next.config.ts .

ENV NODE_ENV=production
EXPOSE 3000

# Start the app with PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
