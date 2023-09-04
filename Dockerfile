FROM node:18.17.1 as build-step

RUN mkdir - /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/test-angular-wo /usr/share/nginx/html
