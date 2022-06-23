package main

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	Port          = 8080
	ConnectionURI = "mongodb://127.0.0.1:27017/"
)

var (
	db *mongo.Database
)

func SetupMongo(ctx context.Context) error {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(ConnectionURI))
	if err != nil {
		return err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		return err
	}

	db = client.Database("budget")
	return nil
}

func main() {
	ctx := context.TODO()

	err := SetupMongo(ctx)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
}
