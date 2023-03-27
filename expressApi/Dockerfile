FROM node:18

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install nodemon -g
RUN npm install

COPY . .

ENV DB_HOST="mongo"
ENV DB_PORT="27017"
ENV MONGO_URL="mongodb://admin:password@mongodb:27017/myapp?authSource=admin"

CMD ["npm", "run", "dev"]

EXPOSE 3000