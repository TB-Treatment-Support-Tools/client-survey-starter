FROM node:14 as base
WORKDIR /usr/src/app
COPY package.json yarn.lock config-overrides.js ./
RUN yarn install
RUN yarn global add react-scripts
COPY . ./
# TODO: Enable prod build
# FROM base as production
# ENV NODE_PATH=./build
# RUN yarn run build
