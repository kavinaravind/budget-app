import React from "react";
import type { NextPage } from "next";
import Router from "next/router";
import axios from "axios";

import { Context, Transaction, TransactionContext } from "./_app";

const Create: NextPage = () => {
  const transactionContext = React.useContext<Context>(TransactionContext);

  const [transaction, setTransaction] = React.useState<Transaction>(
    {} as Transaction
  );

  const updateTransaction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestOptions = {
      url: "/api/transaction",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(transaction),
    };
    const { data } = await axios.request(requestOptions);
    console.log(data);

    transactionContext.setTransaction(null);
    Router.push(`/`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const t = { ...transaction };
    const value = event.target.value;
    switch (event.target.name) {
      case "name":
        t.name = value;
        break;
      case "category":
        t.category = value;
        break;
      case "cost":
        t.cost = +value;
        break;
    }
    setTransaction(t);
  };

  interface input {
    name: keyof Transaction;
    type: string;
    title: string;
  }

  const inputs: input[] = [
    { type: "text", name: "name", title: "Name" },
    { type: "text", name: "category", title: "Category" },
    { type: "number", name: "cost", title: "Cost" },
  ];

  return (
    <div className="py-10">
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <form
              onSubmit={(e) => updateTransaction(e)}
              className="space-y-8 divide-y divide-gray-200"
            >
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Create Transaction
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Insert the name, category, and cost of the transaction
                    </p>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    {inputs.map((input) => (
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor={input.name}
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          {input.title}
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type={input.type}
                            name={input.name}
                            id={input.name}
                            value={transaction[input.name]}
                            onChange={(e) => handleChange(e)}
                            className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 
                                      sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => Router.push("/")}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 
                              hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium 
                              rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                              focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
