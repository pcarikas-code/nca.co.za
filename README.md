# NCA Website Deployment Guide

This guide provides step-by-step instructions for deploying the NCA Website to a Plesk server using Docker.

## Prerequisites

1.  **Plesk Server**: You must have administrative access to your Plesk panel.
2.  **Docker Extension**: Ensure the "Docker" extension is installed and enabled in Plesk.
3.  **Git Extension**: (Optional) Useful for pulling the repository directly in Plesk, or you can use SSH.
4.  **SSH Access**: Recommended for running the build and deploy scripts.

## Deployment Options

### Option 1: Using SSH (Recommended)

This method uses the provided `build.sh` and `deploy.sh` scripts for a quick setup.

1.  **Connect to your server via SSH.**
    ```bash
    ssh username@your-server-ip
    ```

2.  **Navigate to your project directory.**
    If you haven't cloned the repo yet:
    ```bash
    git clone https://github.com/pcarikas-code/nca.co.za.git
    cd nca.co.za
    ```
    If you already have the repo:
    ```bash
    cd /path/to/nca.co.za
    git pull origin main
    ```

3.  **Make scripts executable (first time only).**
    ```bash
    chmod +x build.sh deploy.sh
    ```

4.  **Build the Docker image.**
    ```bash
    ./build.sh
    ```

5.  **Deploy the container.**
    ```bash
    ./deploy.sh
    ```
    This will start the container on port **3004**.

### Option 2: Using Plesk Docker Extension (GUI)

1.  **Go to Docker** in the Plesk sidebar.
2.  **Upload** the `docker-compose.yml` file if prompted, or search for the image if you pushed it to a registry (this guide assumes local build via SSH is preferred).
    *Note: Since this project requires building a custom image from source, Option 1 (SSH) is significantly easier. If you must use the GUI, you would typically need to build the image locally and push it to Docker Hub first.*

## Configuring the Domain in Plesk (Proxy Rules)

Once the Docker container is running on port 3004, you need to tell Plesk to serve it on your domain (`nca.co.za`).

1.  **Log in to Plesk** and go to **Websites & Domains**.
2.  Find your domain (`nca.co.za`).
3.  Click on **Docker Proxy Rules** (if available) OR **Apache & nginx Settings**.

### Method A: Using "Docker Proxy Rules" (If extension is fully integrated)
1.  Click **Add Rule**.
2.  **URL**: Leave as `/` (root).
3.  **Container**: Select `nca-website`.
4.  **Port**: Select `3004 -> 80`.
5.  Click **OK**.

### Method B: Using "Apache & nginx Settings" (Standard Method)
1.  Click on **Apache & nginx Settings**.
2.  Uncheck **Proxy mode** (if you want Nginx to handle everything directly) OR leave it checked and configure the proxy pass.
3.  **Recommended**: Under **Additional nginx directives**, add the following:
    ```nginx
    location / {
        proxy_pass http://localhost:3004;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    ```
4.  Click **OK** or **Apply**.

## Troubleshooting

-   **Container not starting?**
    Run `docker logs nca-website` to see error messages.
-   **502 Bad Gateway?**
    Ensure the container is running (`docker ps`) and that the port 3004 is correctly mapped.
-   **Changes not showing?**
    If you updated the code, remember to run `./build.sh` and then `./deploy.sh` again to rebuild the image and restart the container.
