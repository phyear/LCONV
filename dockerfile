FROM nginx:latest
ADD nginx.conf /etc/nginx/nginx.conf
ADD dist /usr/share/nginx/html
EXPOSE 80
# 启动Nginx，并且Nginx会持续运行
CMD ["nginx", "-g", "daemon off;"]