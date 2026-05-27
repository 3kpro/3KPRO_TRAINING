# Containerization with Docker

Docker is a platform designed to help developers build, share, and run modern applications. We handle the tedious setup, so you can focus on the code.

## Why Docker?
- **Consistency:** Ensures the application runs the same in development, testing, and production.
- **Isolation:** Containers bundle their own software, libraries, and configuration files.

## Example Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
