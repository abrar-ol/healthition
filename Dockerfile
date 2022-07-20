FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080
ENV TEST_ME='I AM A TEST'

EXPOSE 8080

CMD ["npm","start"]