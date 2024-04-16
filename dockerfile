FROM nginx:latest
ADD nginx.conf /etc/nginx/nginx.conf
ADD dist /usr/share/nginx/html