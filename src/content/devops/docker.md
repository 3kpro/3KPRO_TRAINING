# Master Class: Containerization with Docker

Docker revolutionized the industry by solving the "It works on my machine" problem. To master Docker, you must understand the **Layers of the Image**, the **Storage Driver**, and **Container Networking**.

## 1. The Anatomy of a Docker Image

A Docker image is a stack of read-only layers. Each instruction in a `Dockerfile` creates a new layer.

| Layer | Type | Description |
| :--- | :--- | :--- |
| **Top Layer** | Read/Write | Created when the container starts. Stores temporary data. |
| **Middle Layers** | Read-Only | Result of `RUN`, `COPY`, `ADD` instructions. |
| **Base Layer** | Read-Only | The Parent Image (e.g., `alpine`, `ubuntu`). |

---

## 2. Optimization: The Master Dockerfile
A master developer optimizes for **Build Cache** and **Image Size**.

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install          # Installed before code copy to leverage cache
COPY . .
RUN npm run build

# Stage 2: Production (Multi-stage build)
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Visual Breakdown of Multi-Stage Builds
- **Builder Stage:** Contains full Node.js, dev dependencies, and source code (~800MB).
- **Production Stage:** Contains only Nginx and static files (~20MB).
- **Result:** Minimal attack surface and lightning-fast deployments.

---

## 3. Container Networking Breakdown

Docker uses several network drivers to facilitate communication:

1. **Bridge (Default):** For containers running on the same host.
2. **Host:** Container shares the host's networking namespace (no isolation).
3. **Overlay:** For communication between containers on different hosts (Swarm/K8s).
4. **None:** Complete network isolation.

---

## 4. Persistent Data: Volumes vs Bind Mounts

- **Volumes:** Managed by Docker (`/var/lib/docker/volumes`). Preferred for database storage.
- **Bind Mounts:** Maps a specific folder on your host machine to the container. Great for dev mode hot-reloading.

---

## 5. Master Commands

```bash
# Clean up everything (use with caution)
docker system prune -a --volumes

# Inspect the metadata of a container
docker inspect <container_id>

# Check resource usage in real-time
docker stats
```

## 6. Checklist
- [ ] Are you using `.dockerignore` to keep your images small?
- [ ] Are your containers running as a non-root user?
- [ ] Are you using specific tags instead of `:latest` for production?
