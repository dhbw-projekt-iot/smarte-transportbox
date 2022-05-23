FROM node:16

WORKDIR /var/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4004

CMD ["node", "./dist/app.js"]