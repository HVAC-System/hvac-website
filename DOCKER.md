# Docker Setup for HVAC & Lighting Design Tool (Production)

This document provides instructions for dockerizing and deploying the HVAC & Lighting Design Tool in production using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

### Production Deployment

```bash
# Start production environment
./docker-scripts.sh start
```

The application will be available at `http://localhost:3000`

## Docker Files Overview

### Core Docker Files

#### `Dockerfile`

- **Purpose**: Multi-stage production Docker build configuration
- **Features**:
  - Alpine Linux base image for minimal size
  - Non-root user execution for security
  - Next.js standalone output optimization
  - Multi-stage build for reduced image size

#### `docker-compose.yml`

- **Purpose**: Development and default production environment configuration
- **Features**:
  - Builds from local Dockerfile
  - Exposes port 3000
  - Production environment variables
  - Health checks with wget
  - Automatic restart policy

```yaml
services:
  hvac-design-tool:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
    healthcheck:
      test:
        [
          "CMD",
          "wget",
          "--no-verbose",
          "--tries=1",
          "--spider",
          "http://localhost:3000",
        ]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

#### `docker-compose.prod.yml`

- **Purpose**: Production deployment using pre-built images from GitHub Container Registry
- **Features**:
  - Uses `ghcr.io/your-org/hvac-design-tool:latest` image
  - Exposes on port 80 (standard HTTP port)
  - Always restart policy
  - Environment variable configuration
  - Secrets support (commented)

```yaml
services:
  web:
    image: ghcr.io/your-org/hvac-design-tool:latest
    restart: always
    ports:
      - "80:3000" # Expose on port 80, container listens on 3000
    environment:
      NODE_ENV: production
      # Add any other environment variables your app needs here
```

### Docker Management Scripts

#### `docker-scripts.sh`

- **Purpose**: Comprehensive Docker container management script
- **Features**:
  - Colored output for better UX
  - Support for custom compose files with `-f` argument
  - All major Docker operations (start, stop, build, logs, etc.)
  - Health checks and testing capabilities
  - Error handling and validation
  - GitHub Container Registry authentication (login/logout)

**Usage:**

```bash
# Make executable
chmod +x docker-scripts.sh

# Basic commands
./docker-scripts.sh start     # Start production environment
./docker-scripts.sh build     # Build Docker images
./docker-scripts.sh stop      # Stop all containers
./docker-scripts.sh restart   # Restart all containers
./docker-scripts.sh clean     # Stop and remove all containers, images, and volumes
./docker-scripts.sh logs      # Show logs for running containers
./docker-scripts.sh shell     # Open shell in running container
./docker-scripts.sh health    # Check application health
./docker-scripts.sh status    # Show container status
./docker-scripts.sh test      # Run tests in Docker container
./docker-scripts.sh login     # Login to GitHub Container Registry (GHCR)
./docker-scripts.sh logout    # Logout from GitHub Container Registry (GHCR)
./docker-scripts.sh help      # Show help message

# With custom compose file
./docker-scripts.sh start -f docker-compose.prod.yml    # Use production compose file
./docker-scripts.sh build -f custom-compose.yml         # Use custom compose file
```

**GitHub PAT Setup for Login:**

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `read:packages`, `write:packages`, `delete:packages`
4. Copy token and use when prompted by `./docker-scripts.sh login`

### CI/CD Integration

#### `.github/workflows/docker-publish.yml`

- **Purpose**: GitHub Actions workflow for automated Docker image building and publishing
- **Triggers**: On version tags (v\*)
- **Features**:
  - Automatic version extraction from git tags
  - GitHub Container Registry authentication
  - Multi-arch image building
  - Latest and versioned tags
  - Lowercase owner name handling

```yaml
name: Build and Push Docker image to GHCR

on:
  push:
    tags:
      - "v*" # Triggers on tags like v1.0.0

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Extract version from tag
        id: get_version
        run: echo "TAG=${GITHUB_REF#refs/tags/v}" >> $GITHUB_ENV

      - name: Set lowercase owner
        id: vars
        run: echo "OWNER_LC=${GITHUB_REPOSITORY_OWNER,,}" >> $GITHUB_ENV

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and Push Docker image
        run: |
          docker build -t ghcr.io/${OWNER_LC}/hvac-design-tool:${{ env.TAG }} .
          docker tag ghcr.io/${OWNER_LC}/hvac-design-tool:${{ env.TAG }} ghcr.io/${OWNER_LC}/hvac-design-tool:latest
          docker push ghcr.io/${OWNER_LC}/hvac-design-tool:${{ env.TAG }}
          docker push ghcr.io/${OWNER_LC}/hvac-design-tool:latest
```

### Configuration Files

#### `.dockerignore`

- **Purpose**: Exclude unnecessary files from Docker build context
- **Benefits**:
  - Faster builds
  - Smaller build context
  - Prevents sensitive files from being included
  - Excludes development files and dependencies

## Docker Commands

### Building the Image

```bash
# Build the production image
./docker-scripts.sh build

# Or manually
docker-compose build

# Build with custom compose file
./docker-scripts.sh build -f docker-compose.prod.yml
```

### Managing Containers

```bash
# Start production
./docker-scripts.sh start

# Stop containers
./docker-scripts.sh stop

# Restart containers
./docker-scripts.sh restart

# View status
./docker-scripts.sh status

# View logs
./docker-scripts.sh logs

# Check health
./docker-scripts.sh health

# Open shell in container
./docker-scripts.sh shell

# Run tests in Docker container
./docker-scripts.sh test

# Clean up
./docker-scripts.sh clean
```

- **`./docker-scripts.sh test`**: Builds the Docker image and runs your test suite inside the container. This is useful for verifying that your build and tests pass in the same environment as production, before pushing to GitHub or deploying.

## Environment Variables

Create a `.env` file in the project root for environment-specific configuration:

```env
# Next.js
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Application specific
NEXT_PUBLIC_API_URL=https://api.hvac-design-tool.com
NEXT_PUBLIC_CLIMATE_API_URL=https://api.openweathermap.org
NEXT_PUBLIC_STANDARDS_DB_URL=https://standards-api.example.com
```

## Production Features

### Security

- Non-root user execution
- Security headers
- Rate limiting (if configured on server)
- SSL/TLS encryption (managed by server nginx)

### Performance

- Multi-stage builds for minimal image size
- Next.js standalone output
- Alpine Linux base image
- Health checks

### Monitoring

- Health check endpoints
- Container status monitoring
- Log aggregation ready

## Health Checks

The setup includes health checks for the application:

```bash
# Check application health
./docker-scripts.sh health

# Or manually
curl http://localhost:3000
```

## Troubleshooting

### Docker Permission Issues

If you encounter permission errors like:

```
permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/auth": dial unix /var/run/docker.sock: connect: permission denied
```

**Solution: Add your user to the docker group**

```bash
# Add your user to the docker group
sudo usermod -aG docker $USER

# Verify the user was added to the group
groups $USER

# Apply group changes immediately (or log out and log back in)
newgrp docker

# Test Docker access
docker run hello-world
```

**Alternative: Use sudo temporarily**

```bash
# Run docker commands with sudo while setting up permissions
sudo docker compose up -d
```

**Important Notes:**

- After adding yourself to the docker group, you need to log out and log back in for the changes to take effect, or use `newgrp docker`
- Adding a user to the docker group gives them root-equivalent access to the Docker daemon
- If you're on a cloud server, you might need to restart the instance for group changes to take effect

### Common Issues

1. **Port already in use**

   ```bash
   # Check what's using port 3000
   lsof -i :3000
   ```

2. **Build failures**

   ```bash
   # Clean and rebuild
   ./docker-scripts.sh clean
   ./docker-scripts.sh build
   ```

3. **Container not starting**

   ```bash
   # Check logs
   ./docker-scripts.sh logs

   # Check status
   ./docker-scripts.sh status
   ```

4. **Debugging inside container**

   ```bash
   # Open shell in running container
   ./docker-scripts.sh shell

   # This gives you access to the container's filesystem
   # Useful for debugging file permissions, checking logs, etc.
   ```

5. **Test your build and code before pushing**

   ```bash
   # Run your test suite inside the Docker container
   ./docker-scripts.sh test

   # This ensures your build and tests pass in the same environment as CI/CD and production.
   ```

6. **GitHub Container Registry authentication issues**

   ```bash
   # Login to GHCR
   ./docker-scripts.sh login

   # Check if you're logged in
   docker info | grep "Username"

   # Logout if needed
   ./docker-scripts.sh logout
   ```

### Logs

```bash
# View all logs
./docker-scripts.sh logs

# View specific service logs
docker-compose logs hvac-design-tool
```

## Production Deployment

### Local/Staging

```bash
./docker-scripts.sh start
```

### Server Deployment

```bash
# Build and start the container
./docker-scripts.sh start

# The application will be available on port 3000
# Configure your server's nginx to proxy to localhost:3000
```

### Using Production Compose File

```bash
# Use production compose file (uses pre-built image)
./docker-scripts.sh start -f docker-compose.prod.yml
```

## File Structure

```
.
├── Dockerfile                    # Production Docker build
├── .dockerignore                 # Files to exclude from build
├── docker-compose.yml           # Development/production service
├── docker-compose.prod.yml      # Production deployment (pre-built image)
├── docker-scripts.sh            # Management script (includes login/logout)
└── .github/workflows/
    └── docker-publish.yml       # CI/CD workflow
```

## Server Nginx Configuration

Since nginx is managed separately on the server, here's a sample nginx configuration for your server:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Best Practices

1. **Always use specific image tags** in production
2. **Scan images for vulnerabilities** regularly
3. **Use secrets management** for sensitive data
4. **Monitor resource usage** and set limits
5. **Implement log aggregation** for production
6. **Use volume mounts** for persistent data
7. **Set up monitoring** and alerting
8. **Configure server nginx** for SSL termination and caching
9. **Use the test command** before pushing to production
10. **Keep Docker images updated** with security patches
