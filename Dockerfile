# Multi-stage build for SvelteKit web-grid showcase
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Copy web-grid package first (needed for file: dependency)
COPY web-grid-package/ ./web-grid-package/

# Copy package files and update dependency path
COPY package.json ./
RUN sed -i 's|file:../web-grid/packages/web-grid|file:./web-grid-package|g' package.json

# Install dependencies
RUN npm i

# Copy source code
COPY . .

# Build the SvelteKit app for static deployment
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_types
        text/plain
        text/css
        text/js
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Handle SvelteKit routing
    location / {
        try_files \$uri \$uri.html \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://stats.keenmate.services; connect-src 'self' https://stats.keenmate.services; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';";
}
EOF

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]