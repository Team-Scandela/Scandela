FROM node:18

COPY . /prod

WORKDIR /prod

RUN npm install

EXPOSE 4000

CMD ["npx", "nodemon"]
