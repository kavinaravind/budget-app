import React from "react";
import type { NextPage } from "next";
import Router from 'next/router'

import { Transaction, Context,TransactionContext } from "./_app";

type HomeProps = {
  transactions: Transaction[]
}

export async function getStaticProps(): Promise<{props: HomeProps}> {
  const res = await fetch('http://localhost:3001/transactions')
  const transactions = await res.json()
  return {
    props: {
      transactions,
    },
  }
}

const Home: NextPage<HomeProps> = ({ transactions }) => {
  const transactionContext = React.useContext<Context>(TransactionContext)

  const createTransaction = () => {
    transactionContext.setTransaction(null)
    Router.push(`/create`)
  }

  const editTransaction = (t: Transaction) => {
    transactionContext.setTransaction(t)
    Router.push(`/update?id=${t.id}`)
  }


  return (
    <div className="py-10">
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A simple list of transactions
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  onClick={() => createTransaction()}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 
                              px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none 
                              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                >
                  Create Transaction
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                          <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                          <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-gray-900">Cost</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {transactions.map((t) => (
                          <tr key={t.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{t.name}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{t.category}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(t.cost / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button type="button" onClick={() => editTransaction(t)} className="text-blue-600 hover:text-blue-900">Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
