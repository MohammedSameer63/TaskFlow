# ---------- build stage ----------
FROM node:20-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY src ./src
RUN npx prisma generate

COPY src ./src

# ---------- runtime stage ----------
FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src
COPY package*.json ./

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=2s --retries=5 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]
