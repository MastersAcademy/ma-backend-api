FROM node:20

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of application code
COPY . .

#COPY .env.prod ./ 

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]

## it's optional row - test full chain ci/cd ##
