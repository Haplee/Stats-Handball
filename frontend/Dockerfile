# Stage 1: Use a lightweight web server
FROM nginx:stable-alpine

# Copy the static files from the frontend directory into the Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# The default Nginx command will start the server
CMD ["nginx", "-g", "daemon off;"]
