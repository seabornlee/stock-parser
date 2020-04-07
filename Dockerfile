FROM nikolaik/python-nodejs:python3.5-nodejs13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 80

CMD [ "npm", "start" ]
