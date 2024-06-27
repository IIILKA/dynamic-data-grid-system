FROM node:20-alpine as builder
WORKDIR /app
COPY ddgs.client/package.json .
COPY ddgs.client/yarn.lock .
#COPY package.json .
#COPY yarn.lock .
RUN corepack enable yarn
COPY ddgs.client/. .
RUN yarn install
#RUN yarn tsc
#RUN apt-get --assume-yes install yarn && apt-mark hold yarn
RUN yarn build
#RUN apt-get update
#RUN apt-get install curl
#RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
#RUN apt-get -y install nodejs
EXPOSE 8180
CMD [ "yarn", "dev" ]
#CMD ["node", "src/index.js"]
