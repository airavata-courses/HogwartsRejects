FROM node
WORKDIR /index
COPY package.json .
RUN npm install
COPY . .
CMD node index.js
EXPOSE 8090