package main

import (
	"context"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	address        = ":3000"
	connectionURI  = "mongodb://127.0.0.1:27017/"
	dbName         = "budget"
	collectionName = "transaction"
)

var (
	db *mongo.Database
)

type transaction struct {
	Category string `bson:"category"`
	Cost     int    `bson:"cost"`
	Name     string `bson:"name"`
}

func setupMongo(ctx context.Context) error {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(connectionURI))
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

func createTransaction(ctx context.Context, transaction *transaction) error {
	_, err := db.Collection(collectionName).InsertOne(ctx, transaction)
	return err
}

func getTransactions(ctx context.Context) ([]transaction, error) {
	var transactions []transaction

	cursor, err := db.Collection(collectionName).Find(ctx, bson.D{})
	if err != nil {
		defer cursor.Close(ctx)
		return transactions, err
	}

	var transaction transaction
	for cursor.Next(ctx) {
		err := cursor.Decode(&transaction)
		if err != nil {
			return transactions, err
		}
		transactions = append(transactions, transaction)
	}

	return transactions, nil
}

func updateTransaction(ctx context.Context, id primitive.ObjectID, transaction *transaction) error {
	_, err := db.Collection(collectionName).UpdateOne(
		ctx,
		bson.D{{Key: "_id", Value: id}},
		transaction,
	)
	return err
}

func deleteTransaction(ctx context.Context, id primitive.ObjectID) error {
	_, err := db.Collection(collectionName).DeleteOne(
		ctx,
		bson.D{{Key: "_id", Value: id}},
	)
	return err
}

func createTransactionHandler(c echo.Context) error {
	transaction := transaction{}
	err := c.Bind(transaction)
	if err != nil {
		return err
	}
	err = createTransaction(c.Request().Context(), &transaction)
	if err != nil {
		return err
	}
	return c.String(http.StatusOK, "OK")
}

func getTransactionsHandler(c echo.Context) error {
	transactions, err := getTransactions(c.Request().Context())
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, &transactions)
}

func updateTransactionHandler(c echo.Context) error {
	objID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		return err
	}
	transaction := transaction{}
	if err := c.Bind(transaction); err != nil {
		return err
	}
	err = updateTransaction(c.Request().Context(), objID, &transaction)
	if err != nil {
		return err
	}
	return c.String(http.StatusOK, "OK")
}

func deleteTransactionHandler(c echo.Context) error {
	objID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		return err
	}
	err = deleteTransaction(c.Request().Context(), objID)
	if err != nil {
		return err
	}
	return c.String(http.StatusOK, "OK")
}

func main() {
	ctx := context.TODO()

	err := setupMongo(ctx)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	defer func(ctx context.Context) error {
		return db.Client().Disconnect(ctx)
	}(ctx)

	e := echo.New()

	e.POST("/transaction", createTransactionHandler)
	e.GET("/transactions", getTransactionsHandler)
	e.PUT("/transaction/:id", updateTransactionHandler)
	e.DELETE("/transaction/:id", deleteTransactionHandler)

	e.Logger.Fatal(e.Start(address))
}
