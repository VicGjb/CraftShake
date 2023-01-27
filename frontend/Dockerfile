FROM node:16.13.0

RUN mkdir /project

WORKDIR /project

COPY ./cocktails/package.json /cocktails/package-lock.json /project/ 

RUN yarn install
RUN echo 'File outside conteiner'
RUN head ./cocktails/src/components/network_manager.jsx
COPY ./cocktails/public/ /project/public/ 
RUN echo 'File inside Docker'
RUN head /project/src/components/network_manager.jsx
COPY ./cocktails/src/ /project/src/

ENTRYPOINT ["yarn", "start"]