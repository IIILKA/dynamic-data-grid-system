FROM node:20-alpine as builder
WORKDIR /app
COPY ddgs.client/package.json .
RUN corepack enable yarn
COPY ddgs.client/. .
RUN yarn install
RUN yarn build
CMD [ "yarn", "local" ]
