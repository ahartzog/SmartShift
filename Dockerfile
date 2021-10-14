FROM node:14-alpine As development

WORKDIR /usr/src/app

#Copy package.json and package-lock.json
COPY package*.json .
COPY yarn.lock .

RUN yarn install

COPY ./server .

RUN yarn run build

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .
COPY yarn.lock .

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]