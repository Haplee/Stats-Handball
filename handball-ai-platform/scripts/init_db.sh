#!/bin/bash
# scripts/init_db.sh

# This script is a utility to initialize the database schema using Flask-Migrate.
# It should be run after the services are up and running for the first time.

echo "Waiting for PostgreSQL to be ready..."
# A more robust solution would be to use a tool like wait-for-it.sh
sleep 10

echo "Executing database migrations inside the backend container..."

# Check if docker-compose is available, otherwise use docker compose
if command -v docker-compose &> /dev/null
then
    COMPOSE_CMD="docker-compose"
else
    COMPOSE_CMD="docker compose"
fi

# Run the migration commands
$COMPOSE_CMD exec backend flask db init
$COMPOSE_CMD exec backend flask db migrate -m "Initial migration."
$COMPOSE_CMD exec backend flask db upgrade

echo "Database initialization and migration complete."
