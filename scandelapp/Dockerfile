FROM node:18

COPY . /prod

WORKDIR /prod

RUN npm install 

RUN npm run build

RUN npm install -g serve

EXPOSE 2000 

CMD ["serve", "-s", "build", "-l", "2000"]