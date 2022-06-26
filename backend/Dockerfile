FROM node:16 as dev

WORKDIR /var/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4004

CMD ["node", "./dist/app.js"]

FROM node:lts-alpine as builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY --from=builder /usr/app/dist dist/

CMD ["node", "dist/app.js"]