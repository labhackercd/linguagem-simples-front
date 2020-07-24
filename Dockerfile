FROM node:latest
RUN npm install -g serve
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN apk update && apk add git

RUN mkdir -p  /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN rm -rf package-lock.json node_modules
RUN npm install --silent
RUN npm run build


CMD ["serve","-s", "build"]