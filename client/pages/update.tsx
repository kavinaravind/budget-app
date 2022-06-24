import React from "react";
import type { NextPage } from "next";
import Router from 'next/router'

import { Context, Transaction, TransactionContext } from "./_app";

const Update: NextPage = () => {

  const transactionContext = React.useContext<Context>(TransactionContext)
  if (transactionContext.transaction == null) {
    return <h3>No Transaction to Update</h3>
  }

  const [transaction, setTransaction] = React.useState<Transaction>(transactionContext.transaction)

  const updateTransaction = () => {
    transactionContext.setTransaction(null)
    Router.push(`/`)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const t = { ...transaction };
    const value = event.target.value;
    switch (event.target.name) {
      case "name":
        t.name = value;
        break;
      case "category":
        t.category =value;
        break;
      case "cost":
        t.cost = +value;
        break;
    }
    setTransaction(t)
  }
  
  return (
    <div className="py-10">
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <form onSubmit={() => updateTransaction()}className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Update Transaction
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Update the name, category, and cost of the transaction
                    </p>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Name
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={transaction.name}
                          onChange={(e) => handleChange(e)}
                          className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Category
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="category"
                          id="category"
                          value={transaction.category}
                          onChange={(e) => handleChange(e)}
                          className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="cost"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Cost
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="number"
                          name="cost"
                          id="cost"
                          value={transaction.cost}
                          onChange={(e) => handleChange(e)}
                          className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => Router.push('/')}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update
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

export default Update;
