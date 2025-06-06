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

# Production stage: serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
