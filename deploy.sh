#!/bin/bash

# Stop and remove existing container if it exists
echo "Stopping existing container..."
docker stop nca-website 2>/dev/null || true
docker rm nca-website 2>/dev/null || true

# Run the new container
echo "Deploying container on port 3004..."
docker run -d \
  --name nca-website \
  --restart always \
  -p 3004:80 \
  -e NODE_ENV=production \
  nca-website

echo "Deployment complete. Website running on port 3004."
