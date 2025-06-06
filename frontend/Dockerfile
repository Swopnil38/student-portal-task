# Dockerfile for Vite/React Frontend

# Build stage
FROM node:20-alpine as build

# Update apk packages to reduce vulnerabilities
RUN apk update && apk upgrade
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Production stage (not used directly, but for reference)
FROM nginx:alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
