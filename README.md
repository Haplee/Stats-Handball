# Stats Handball - Vercel Serverless

This project is a refactored version of the original Stats Handball application, designed for a serverless architecture and deployment on Vercel.

## Architecture

-   **Frontend:** Static HTML, CSS, and JavaScript served from the `/public` directory.
-   **Backend:** Node.js serverless functions located in the `/api` directory.
    -   `/api/health`: A health check endpoint.
    -   `/api/stats`: An endpoint that provides sample statistics data.

## Deployment

This application is intended for deployment on Vercel. Connect your Git repository to Vercel for automatic deployments.
