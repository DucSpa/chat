FROM node:20

WORKDIR /app

# Install ffmpeg
RUN apt-get update
# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of your app's code
COPY . .

CMD ["node", "index.js"]