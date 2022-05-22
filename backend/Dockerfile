FROM node:16

WORKDIR /var/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4004

CMD ["node", "app.js"]