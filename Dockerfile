FROM ubuntu:20.04
RUN apt update --fix-missing
RUN DEBIAN_FRONTEND=noninteractive apt install -y build-essential golang curl
ADD . /app
WORKDIR /app
RUN mkdir -p ./out
WORKDIR /app/server

RUN CGO_ENABLED=0 go build server.go
CMD ./server
