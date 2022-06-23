package main

import (
	"context"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	address       = ":8080"
	connectionURI = "mongodb://127.0.0.1:27017/"
	dbName        = "budget"
)

var (
	db *mongo.Database
)

type response struct {
	status string
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

func getBudgetsHandler(c echo.Context) error {
	ok := response{
		status: "sucessful",
	}
	return c.JSON(http.StatusOK, &ok)
}

func createBudgetHandler(c echo.Context) error {
	ok := response{
		status: "sucessful",
	}
	return c.JSON(http.StatusOK, &ok)
}

func updateBudgetHandler(c echo.Context) error {
	ok := response{
		status: "sucessful",
	}
	return c.JSON(http.StatusOK, &ok)
}

func deleteBudgetHandler(c echo.Context) error {
	ok := response{
		status: "sucessful",
	}
	return c.JSON(http.StatusOK, &ok)
}

func main() {
	ctx := context.TODO()

	err := setupMongo(ctx)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}

	e := echo.New()

	e.GET("/budgets", getBudgetsHandler)
	e.POST("/budget", createBudgetHandler)
	e.PUT("/budget/:id", updateBudgetHandler)
	e.DELETE("/budget/:id", deleteBudgetHandler)

	e.Logger.Fatal(e.Start(address))
}
