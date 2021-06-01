FROM node:12.18.0 as builder

# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app
WORKDIR /app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# COPY package.json /usr/src/app/package.json
COPY ./package*.json ./
RUN npm install
# RUN npm install react-scripts@4.0.3 -g --silent

COPY . .
RUN npm run build

FROM nginx:latest

# RUN rm -rf /etc/nginx/conf.d
# COPY conf.d /etc/nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/certificate.crt /etc/ssl/certificate.crt
COPY nginx/private.key /etc/ssl/private.key

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
