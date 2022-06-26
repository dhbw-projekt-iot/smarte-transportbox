FROM node:lts-alpine as builder

WORKDIR /app

COPY package*.json ./

COPY . .

ARG REACT_APP_BACKEND_URL
ARG REACT_APP_FRONTEND_HOST

RUN npm install && npm run build

FROM nginx:alpine as production

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build ./

WORKDIR /
RUN rm -rf etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf etc/nginx/conf.d

ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM node:lts-alpine as dev

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

