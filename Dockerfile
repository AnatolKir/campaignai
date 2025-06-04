FROM node:18-alpine

# Enable corepack for pnpm
RUN corepack enable

WORKDIR /app

# Copy everything first
COPY . .

# Debug: show what we have
RUN ls -la && echo "=== Apps directory ===" && ls -la apps/ || echo "No apps directory"

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the backend
RUN pnpm run build:backend

# Expose port 3000
EXPOSE 3000

# Start the backend application
CMD ["pnpm", "run", "start:prod:backend"] 