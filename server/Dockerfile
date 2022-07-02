FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN GOOS=linux GOARCH=amd64 go build -o /server

EXPOSE 7726

CMD [ "/server" ]