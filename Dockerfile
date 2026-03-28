FROM nginx:alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY site/ /usr/share/nginx/html/

# Ensure /data exists for referral logs (Railway volume mount or ephemeral fallback)
RUN mkdir -p /data

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
