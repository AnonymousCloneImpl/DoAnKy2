FROM node:21
WORKDIR /usr/src/pages

COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
