FROM node:8.11-alpine
LABEL authors="John Papa"
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
RUN npm build
COPY . .
EXPOSE 8100
CMD ["npm", "start"]
