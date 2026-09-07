# Use the Node 18 Alpine base image (as detected in your workflow logs)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port your app runs on (adjust from 3000 if your app uses a different port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
