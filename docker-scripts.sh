#!/bin/bash

# Docker management scripts for Nikela Website (Production Only)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse optional -f <compose-file> argument
COMPOSE_FILE="docker-compose.yml"
POSITIONAL=()
while [[ $# -gt 0 ]]; do
  case $1 in
    -f)
      COMPOSE_FILE="$2"
      shift 2
      ;;
    *)
      POSITIONAL+=("$1")
      shift
      ;;
  esac
done
set -- "${POSITIONAL[@]}"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [-f <compose-file>]"
    echo ""
    echo "Commands:"
    echo "  start       - Start production environment"
    echo "  build       - Build Docker images"
    echo "  stop        - Stop all containers"
    echo "  restart     - Restart all containers"
    echo "  clean       - Stop and remove all containers, images, and volumes"
    echo "  logs        - Show logs for running containers"
    echo "  shell       - Open shell in running container"
    echo "  health      - Check application health"
    echo "  status      - Show container status"
    echo "  test        - Run tests in Docker container"
    echo "  login       - Login to GitHub Container Registry (GHCR)"
    echo "  logout      - Logout from GitHub Container Registry (GHCR)"
    echo "  help        - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start -f docker-compose.prod.yml      - Start production server with custom compose file"
    echo "  $0 clean      - Clean up Docker resources"
    echo "  $0 login      - Login to GHCR for image pushing"
}

# Function to start production environment
start_prod() {
    print_status "Starting production environment..."
    check_docker
    docker compose -f "$COMPOSE_FILE" up --build -d
    print_success "Production environment started. Access at http://localhost:3000"
}

# Function to build images
build_images() {
    print_status "Building Docker images..."
    check_docker
    docker compose -f "$COMPOSE_FILE" build
    print_success "Images built successfully"
}

# Function to stop containers
stop_containers() {
    print_status "Stopping containers..."
    check_docker
    docker compose -f "$COMPOSE_FILE" down
    print_success "Containers stopped"
}

# Function to restart containers
restart_containers() {
    print_status "Restarting containers..."
    check_docker
    docker compose -f "$COMPOSE_FILE" restart
    print_success "Containers restarted"
}

# Function to clean up
clean_up() {
    print_status "Cleaning up Docker resources..."
    check_docker
    docker compose -f "$COMPOSE_FILE" down --rmi all --volumes --remove-orphans
    docker system prune -f
    print_success "Cleanup completed"
}

# Function to show logs
show_logs() {
    print_status "Showing logs..."
    check_docker
    docker compose -f "$COMPOSE_FILE" logs -f
}

# Function to show status
show_status() {
    print_status "Container status:"
    check_docker
    docker compose -f "$COMPOSE_FILE" ps
}

# Function to open shell in container
open_shell() {
    print_status "Opening shell in container..."
    check_docker
    
    # Get the container name
    CONTAINER=$(docker compose -f "$COMPOSE_FILE" ps -q nikela-website 2>/dev/null)
    
    if [ -z "$CONTAINER" ]; then
        print_error "No running container found. Start the application first."
        exit 1
    fi
    
    docker exec -it "$CONTAINER" /bin/sh
}

# Function to check health
check_health() {
    print_status "Checking application health..."
    
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Application is healthy (port 3000)"
    else
        print_error "Application is not responding"
        exit 1
    fi
}

# Function to run tests in Docker container
test_container() {
    print_status "Running tests in Docker container..."
    check_docker
    docker compose -f "$COMPOSE_FILE" build
    docker compose -f "$COMPOSE_FILE" run --rm nikela-website npm test
    print_success "Tests completed"
}

# Function to login to GitHub Container Registry
login_ghcr() {
    print_status "Logging in to GitHub Container Registry (GHCR)..."
    
    read -p "GitHub Username: " GHCR_USER
    read -s -p "GitHub Personal Access Token (PAT): " GHCR_PAT
    echo

    echo "$GHCR_PAT" | docker login ghcr.io -u "$GHCR_USER" --password-stdin

    if [ $? -eq 0 ]; then
        print_success "Logged in to ghcr.io as $GHCR_USER"
    else
        print_error "Login failed. Please check your username and PAT."
        exit 1
    fi
}

# Function to logout from GitHub Container Registry
logout_ghcr() {
    print_status "Logging out from GitHub Container Registry (GHCR)..."
    
    docker logout ghcr.io

    if [ $? -eq 0 ]; then
        print_success "Logged out from ghcr.io"
    else
        print_error "Logout failed."
        exit 1
    fi
}

# Main script logic
case "${1:-help}" in
    start)
        start_prod
        ;;
    build)
        build_images
        ;;
    stop)
        stop_containers
        ;;
    restart)
        restart_containers
        ;;
    clean)
        clean_up
        ;;
    logs)
        show_logs
        ;;
    status)
        show_status
        ;;
    shell)
        open_shell
        ;;
    health)
        check_health
        ;;
    test)
        test_container
        ;;
    login)
        login_ghcr
        ;;
    logout)
        logout_ghcr
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_usage
        exit 1
        ;;
esac 