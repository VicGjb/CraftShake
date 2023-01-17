FROM node:16.13.0

RUN mkdir /project

WORKDIR /project

COPY ./cocktails/package.json /cocktails/package-lock.json /project/ 

RUN yarn install

COPY ./cocktails/public/ /project/public/ 
COPY ./cocktails/src/ /project/src/

ENTRYPOINT ["yarn", "start"]


# RUN yarn add axios

# RUN yarn add react-router-dom

# RUN yarn add sass

# RUN yarn add libphonenumber-js

# RUN yarn add react-dropzone

# RUN yarn add react-hook-form

# RUN yarn add react-select

# RUN yarn add uuid

# RUN yarn add @mui/material @emotion/react @emotion/styled

# RUN yarn add js-file-download

# RUN yarn add formik

# RUN yarn add yup


