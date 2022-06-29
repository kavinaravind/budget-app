FROM node:16-alpine

WORKDIR /app
COPY . ./
RUN npm install
EXPOSE 7725
RUN npm run build
CMD ["npm", "start"]