FROM node:latest
RUN npm install -g serve
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN mkdir -p  /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install --silent
RUN npm run build

CMD ["serve","-s", "build"]