FROM node:16 AS build
WORKDIR /app
ARG HOST
ARG PORT
ARG BACKEND_HOST
ARG BACKEND_PORT
COPY package*.json ./
RUN npm install
COPY . .
RUN REACT_APP_BACKEND_HOST=${BACKEND_HOST} REACT_APP_BACKEND_PORT=${BACKEND_PORT} HOST=${HOST} PORT=${PORT} npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]