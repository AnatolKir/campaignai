FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the backend
WORKDIR /app/apps/backend
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"] 