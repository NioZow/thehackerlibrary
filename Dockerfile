# build stage
FROM node:22-alpine AS builder
WORKDIR /app

# copy files
COPY package*.json ./

# install dependencies
RUN npm install -g pnpm && \
  pnpm install

# copy source
COPY . .

# generate prisma client and build
RUN pnpm run generate && \
    pnpm run build

# production stage
FROM node:22-alpine
WORKDIR /app

RUN npm install -g pnpm

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# expose port
EXPOSE 3000

# set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# start Next.js
CMD ["pnpm", "start"]
