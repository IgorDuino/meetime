FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Copy the entire project directory
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "start"]
