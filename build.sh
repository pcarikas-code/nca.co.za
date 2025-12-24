#!/bin/bash

# Build the Docker image using standard docker command
echo "Building Docker image 'nca-website'..."
docker build -t nca-website .

echo "Build complete."
