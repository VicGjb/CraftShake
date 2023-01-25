FROM node:16.13.0

RUN mkdir /project

WORKDIR /project

COPY ./cocktails/package.json /cocktails/package-lock.json /project/ 

RUN yarn install

COPY ./cocktails/public/ /project/public/ 
COPY ./cocktails/src/ /project/src/

ENTRYPOINT ["yarn", "start"]