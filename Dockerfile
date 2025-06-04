FROM node:20-alpine

# Enable corepack for pnpm
RUN corepack enable

WORKDIR /app

# Copy everything first - v4 FORCE NODE 20
COPY . .

# Debug: show what we have and Node version
RUN ls -la && echo "=== Apps directory ===" && ls -la apps/ || echo "No apps directory"
RUN node --version && echo "Node version confirmed"

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the backend
RUN pnpm run build:backend

# Expose port 3000
EXPOSE 3000

# Start the backend application directly (bypass dotenv)
CMD ["node", "apps/backend/dist/apps/backend/src/main.js"] 