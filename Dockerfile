FROM node:alpine

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-found --loglevel=error

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start:prod"]