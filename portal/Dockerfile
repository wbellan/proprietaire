#Base Image
FROM node:6.9.5-alpine

#Maintainer
MAINTAINER Wardell Bellanger

# Define working directory
WORKDIR /var/www/app

# Install yarn
RUN npm install -g -s --no-progress yarn

# Install node_modules with yarn
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /var/www/app && cd /var/www/app && ln -s /tmp/node_modules

# Copy app
COPY . /var/www/app

# Expose port
EXPOSE 3000

# Run app
CMD ["yarn","start"]
