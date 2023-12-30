# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
# ENV NODE_ENV production

WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install pm2 -g
RUN npm install

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 6001

# Run the application.
#RUN pm2 start src/API/index.js --name APIWorkflowAutomation -i 2 && pm2 start src/bot/index.js --name BOTWorkflowAutomation 
# CMD ["pm2-runtime", "src/API/index.js", "pm2-runtime", "src/bot/index.js"]
CMD ["pm2-runtime", "pm2.ecosystem.config.js"]

#CMD node src/API/index.js
