FROM node:18-alpine

# Enable corepack for pnpm
RUN corepack enable

WORKDIR /app

# Copy package files for dependency resolution
COPY package*.json pnpm-lock.yaml ./
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY . .

# Build the backend
RUN pnpm run build:backend

# Set working directory to backend
WORKDIR /app/apps/backend

# Expose port 3000
EXPOSE 3000

# Start the backend application
CMD ["pnpm", "run", "start"] 