# ----------------------------------------------------------------------------
# Stage 1 - build
# ----------------------------------------------------------------------------
FROM node:14.16 as builder

# Create app directory
RUN mkdir -p /code
WORKDIR /code 

# Install app dependencies
COPY package.json /code/
COPY package-lock.json /code/
RUN npm install

# Copy source code
COPY tsconfig.json /code/
COPY tsconfig.build.json /code/
COPY nest-cli.json /code/
COPY src /code/src

# Build application and output in /code/dist
RUN npm run build

# ----------------------------------------------------------------------------
# Stage 2 - server
# ----------------------------------------------------------------------------
FROM node:14.16

# Create app directory and copy transpiled code
RUN mkdir -p /code/dist
WORKDIR /code

# Install app dependencies
COPY package.json /code/
COPY package-lock.json /code/
RUN npm install --only=production
COPY --from=builder /code/dist/ ./dist/
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Serve
CMD ["node", "dist/main"]