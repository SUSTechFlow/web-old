FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
# Add nginx config
COPY nginx_conf/prod.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
