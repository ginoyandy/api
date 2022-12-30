FROM node:16-buster-slim
ARG environment=PRODUCTION

# tzdata for timzone
RUN apt-get update -y
RUN apt-get install -y tzdata

# timezone env with default
ENV TZ=America/Argentina/Cordoba

RUN apt-get update || : && apt-get install python -y
RUN npm i -g pm2@4.5.6
WORKDIR /back
COPY package.json ./package.json
ENV UV_THREADPOOL_SIZE=32
COPY . ./
RUN npm install
COPY ${environment}.env ./.env
RUN npm run build
EXPOSE 3001
CMD [ "npm", "--", "start" ]