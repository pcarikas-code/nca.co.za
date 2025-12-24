#!/bin/bash

# Deploy the container
echo "Deploying container..."
docker-compose up -d

echo "Deployment complete. Website running on port 3004."
