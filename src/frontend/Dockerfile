FROM node:16 AS build
WORKDIR /app
ARG HOST
ARG PORT
COPY package*.json ./
RUN npm install
COPY . .
RUN HOST=${HOST} PORT=${PORT} npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]