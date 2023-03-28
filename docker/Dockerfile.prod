FROM node:alpine
WORKDIR /usr/arcana
COPY package.json .
RUN npm install\
&& npm install typescript -g
COPY . .
RUN tsc
CMD ["node", "./dist/src/app.js"]