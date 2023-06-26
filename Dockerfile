FROM node:latest AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

# Set environment variables
ENV DB_URI=mongodb://0.tcp.ap.ngrok.io:17241/test
ENV JWT_SECRET="javainuse-secret-key"
ENV INITIALIZATION_VECTOR=e60882c3fe0c5d57529a98ae1913549b
ENV PASSWORD_ENCRYPTION_KEY="dswmt ycial uqqud ronqc nttse"

#RUN cp ./src/config/config.yaml.example ./src/config/config.yaml

RUN npm run build

FROM node:lts-alpine3.13

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["node", "/app/dist/src/main.js"]