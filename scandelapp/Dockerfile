FROM node:14

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

CMD ["npm", "start"]