FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install a simple http-server
RUN npm install http-server -g

RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

CMD [ "http-server", "build", "-p", "8000" ]
