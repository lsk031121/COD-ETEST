
FROM node:latest


# COPY  conf.js  /app/
# COPY  package.json  /app/
# COPY  server.js  /app/
# COPY api/ /app/
COPY ./ /app/
RUN ls -la /

WORKDIR /app
RUN npm install && npm cache clean --force

CMD npm start