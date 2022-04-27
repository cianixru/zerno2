# Stage 2
FROM node:16.14.0

# Папка приложения
ARG HOME_DIR=/home/zern
ARG APPLICATION

RUN mkdir -p ${HOME_DIR}
WORKDIR ${HOME_DIR}
RUN echo $HOME_DIR
RUN apt-get update -y
RUN apt-get install mc -y

COPY ./.result/applications/${APPLICATION}/. ./application

EXPOSE 3000
ENTRYPOINT ["node", "--experimental-specifier-resolution=node", "application/main.js"]
