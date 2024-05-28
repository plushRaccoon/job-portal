FROM node:20.7.0-alpine
WORKDIR ./app
COPY ["package.json", "package-lock.json", "./"]
RUN npm i
COPY . ./
ENTRYPOINT ["npm", "run", "start"]
