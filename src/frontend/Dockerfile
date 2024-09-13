FROM node:16 AS build
WORKDIR /app
ARG FRONTEND_PORT
ARG REACT_APP_BACKEND_HOST
ARG REACT_APP_BACKEND_PORT
COPY package*.json ./
RUN npm install
COPY . .
RUN REACT_APP_BACKEND_HOST=${REACT_APP_BACKEND_HOST} REACT_APP_BACKEND_PORT=${REACT_APP_BACKEND_PORT} PORT=${FRONTEND_PORT} npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]