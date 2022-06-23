package main

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	port          = 8080
	connectionURI = "mongodb://127.0.0.1:27017/"
	dbName        = "budget"
)

var (
	db *mongo.Database
)

func setupMongo(ctx context.Context) error {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(ConnectionURI))
	if err != nil {
		return err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		return err
	}

	db = client.Database(dbName)
	return nil
}

func getBudgets() error {
	return nil
}

func updateBudget() error {
	return nil
}

func createBudget() error {
	return nil
}

func deleteBudget() error {
	return nil
}

func main() {
	ctx := context.TODO()

	err := setupMongo(ctx)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
}
