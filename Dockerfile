FROM node:14-alpine As development

WORKDIR /usr/src/app


#ROOT
COPY package*.json .
COPY yarn.lock .

#MODULES
COPY modules/package.json ./modules/package.json
COPY modules/yarn.lock ./modules/yarn.lock

#SERVER
COPY server/package.json ./server/package.json
COPY server/yarn.lock ./server/yarn.lock

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/server

CMD ["node", "dist/main"]

# RUN yarn build

# FROM node:14-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app 

# COPY package.json .
# COPY yarn.lock .

# COPY --from=development /usr/src/app/server/package.json /usr/src/app/server/package.json
# COPY --from=development /usr/src/app/server/dist /usr/src/app/server/dist

# COPY --from=development /usr/src/app/modules/package.json /usr/src/app/modules/package.json

# RUN yarn install --pure-lockfile --non-interactive --production

# WORKDIR /usr/src/app/server

# CMD ["node", "dist/main"]


#Yarn workspaces and docker --> https://xfor.medium.com/yarn-workspaces-and-docker-39e30402b69b