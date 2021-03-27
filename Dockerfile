# build environment
FROM node:14.16.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# production environment
FROM nginx:stable-alpine
#COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html/keycloakify-demo-app
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
CMD nginx -g 'daemon off;'
