FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .
COPY --from=builder /usr/src/app/node_modules ./node_modules
CMD [ "npm", "run", "start" ]