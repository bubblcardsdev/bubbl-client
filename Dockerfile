# ---------- Build stage ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Faster, reproducible installs
COPY package*.json ./
RUN npm ci

# Copy the rest and build
COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM node:18-alpine AS runner
WORKDIR /app

# PM2 + curl for healthcheck
RUN npm install -g pm2 && apk add --no-cache curl

# Only production deps in final image
COPY package*.json ./
RUN npm ci --omit=dev

# Bring over the built app (adjust for your framework)
# Next.js example:
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# If you have next.config.js, copy it too (ignore if missing)
COPY --from=builder /app/next.config.js ./ || true

ENV NODE_ENV=production
EXPOSE 3000

# Assumes package.json has: "start": "next start -p 3000"
CMD ["pm2-runtime", "start", "npm", "--", "start"]
