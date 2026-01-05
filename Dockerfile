# ---------- build stage ----------
FROM node:20-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

# ---------- runtime stage ----------
FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src
COPY package*.json ./

EXPOSE 3000
CMD ["node", "src/server.js"]
