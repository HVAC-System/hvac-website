# HVAC & Lighting Design Tool

This is a [Next.js](https://nextjs.org) project for an integrated lighting and air conditioning design tool for commercial spaces to optimize energy efficiency, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🎯 Project Overview

**Development of an Integrated Lighting and Air Conditioning Design Tool for Commercial Spaces to Optimize Energy Efficiency**

This tool addresses the critical need for integrated energy-efficient design practices in commercial buildings, particularly in developing countries like Kenya. It enables building designers to consider building orientation, daylighting, and occupancy patterns in a combined lighting and HVAC system design.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📁 Project Structure

### Core Application Files

- `src/app/` - Next.js App Router pages and layouts
- `src/shared/types/` - TypeScript type definitions
- `components/` - Reusable React components
- `public/` - Static assets (images, icons, etc.)

### Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration
- `package.json` - Dependencies and scripts

### Documentation Files

- `CHANGE.md` - Changelog tracking all version releases and changes
- `DOCKER.md` - Comprehensive Docker setup and deployment guide
- `REQUIREMENTS.md` - Detailed project requirements and specifications
- `TASKS.md` - Task tracking for skipped or deferred items
- `TEST_CREDENTIALS.md` - Test credentials for development

## 🔧 Scripts and Automation

### Release Management

- `release.sh` - Automated version bumping and release process

  ```bash
  # Make executable
  chmod +x release.sh

  # Usage
  ./release.sh --major    # Bump major version (1.0.0 -> 2.0.0)
  ./release.sh --minor    # Bump minor version (1.0.0 -> 1.1.0) [default]
  ./release.sh --bugfix   # Bump bugfix version (1.0.0 -> 1.0.1)
  ```

### Docker Management

- `docker-scripts.sh` - Comprehensive Docker container management

  ```bash
  # Make executable
  chmod +x docker-scripts.sh

  # Usage
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
  ./docker-scripts.sh help      # Show help message

  # With custom compose file
  ./docker-scripts.sh start -f docker-compose.prod.yml    # Use production compose file
  ./docker-scripts.sh build -f custom-compose.yml         # Use custom compose file
  ```

## 🐳 Docker Deployment

For detailed Docker setup and deployment instructions, see [DOCKER.md](./DOCKER.md).

### Quick Docker Start

```bash
# Make scripts executable
chmod +x *.sh

# Start production environment
./docker-scripts.sh start
```

The application will be available at `http://localhost:3000`

## 🐧 Docker Installation & Updates on Linux

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

### Installing Docker on Linux

#### Ubuntu/Debian

```bash
# Update package index
sudo apt update

# Install prerequisites
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group (optional, to run without sudo)
sudo usermod -aG docker $USER
# Log out and back in for group changes to take effect
```

#### CentOS/RHEL/Fedora

```bash
# Install prerequisites
sudo yum install -y yum-utils

# Add Docker repository
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker Engine
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group (optional)
sudo usermod -aG docker $USER
```

#### Arch Linux

```bash
# Install Docker
sudo pacman -S docker docker-compose

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group (optional)
sudo usermod -aG docker $USER
```

### Updating Docker on Linux

#### Ubuntu/Debian

```bash
# Update package index
sudo apt update

# Update Docker Engine
sudo apt upgrade docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Restart Docker service
sudo systemctl restart docker
```

#### CentOS/RHEL/Fedora

```bash
# Update Docker Engine
sudo yum update docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Restart Docker service
sudo systemctl restart docker
```

#### Arch Linux

```bash
# Update all packages including Docker
sudo pacman -Syu

# Restart Docker service
sudo systemctl restart docker
```

### Verifying Docker Installation/Update

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version

# Verify Docker is running
sudo systemctl status docker

# Test Docker installation
sudo docker run hello-world
```

### Troubleshooting Docker Updates

#### If Docker won't start after update:

```bash
# Check Docker service status
sudo systemctl status docker

# View Docker logs
sudo journalctl -u docker.service

# Reset Docker daemon
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### If you get permission errors:

```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Log out and back in, or run:
newgrp docker

# Test without sudo
docker run hello-world
```

#### Clean up old Docker versions:

```bash
# Remove old Docker packages (Ubuntu/Debian)
sudo apt autoremove

# Remove old Docker packages (CentOS/RHEL)
sudo yum autoremove

# Clean up Docker system
docker system prune -a
```

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 Development Notes

- **Version Management**: Use `release.sh` for all version bumps and releases
- **Docker Testing**: Use `./docker-scripts.sh test` to run tests in the same environment as production
- **Health Checks**: Use `./docker-scripts.sh health` to verify application status
- **Logs**: Use `./docker-scripts.sh logs` to monitor application logs
- **Cleanup**: Use `./docker-scripts.sh clean` to remove all Docker resources when needed
