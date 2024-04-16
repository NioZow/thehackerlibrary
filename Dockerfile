# Use the Nginx image from Docker Hub
FROM nginx

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Add a new Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d

# Copy the 'dist' directory to the Nginx web root directory
COPY client/dist/ /usr/share/nginx/html
COPY Website/ /usr/share/nginx/html

# Expose port 5000
EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]
