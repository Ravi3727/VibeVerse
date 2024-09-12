# Use the official Node.js image as the base image
FROM node:20-bullseye

# Set the working directory
WORKDIR /app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    ln -s /usr/bin/python3 /usr/bin/python

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild bcrypt binary
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your application runs on
EXPOSE 3000

# Start the application using nodemon
CMD ["npm", "run", "dev"]
