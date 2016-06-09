FROM node:6.1

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app
RUN npm install

# bundle app source
COPY . /usr/src/app

# production environment
ENV NODE_ENV production

# build the app
RUN npm run build

# to create svg images, x is required for font measuring (using nightmare)
ADD entrypoint.sh .
RUN chmod 755 ./entrypoint.sh && \
    apt-get update &&\
    apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libasound2 libxtst6 libxss1 libnss3 xvfb

CMD ["./entrypoint.sh"]
