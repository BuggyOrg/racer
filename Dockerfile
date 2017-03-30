FROM node:6

# to create svg images, x is required for font measuring (using nightmare)
RUN apt-get update &&\
    apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libasound2 libxtst6 libxss1 libnss3 xvfb

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
RUN git config --local url.https://github.com/.insteadOf git://github.com/

ADD entrypoint.sh .
RUN chmod 755 ./entrypoint.sh

CMD ["./entrypoint.sh"]
