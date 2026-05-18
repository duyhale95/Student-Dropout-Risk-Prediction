# ---- Stage 1: Build React app ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

# Biến môi trường để React biết URL backend
ENV REACT_APP_API_URL=http://localhost:8000

RUN npm run build

# ---- Stage 2: Serve với Nginx ----
FROM nginx:1.25-alpine

# Copy file build sang nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Config nginx để handle React Router (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
