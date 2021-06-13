FROM node:12.18.0 as builder

WORKDIR /app
COPY ./package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/certificate.crt /etc/ssl/certificate.crt
COPY nginx/private.key /etc/ssl/private.key

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
