FROM node:latest
# Create app directory
RUN mkdir -p /opt/rest-api
WORKDIR /opt/rest-api

# Install app dependencies
COPY . /opt/rest-api
RUN npm install
RUN npm run build
EXPOSE 8080
CMD [ "npm", "start" ]
