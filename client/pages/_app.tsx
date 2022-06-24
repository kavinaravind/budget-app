import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";

export type Transaction = {
  id: string;
  name: string;
  category: string;
  cost: number;
};

export type Context = {
  transaction: Transaction | null;
  setTransaction: (value: Transaction | null) => void;
};

export const TransactionContext = React.createContext<Context>({
  transaction: null,
  setTransaction: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [transaction, setTransaction] = React.useState<Transaction | null>(null);
  return (
    <TransactionContext.Provider value={{ transaction, setTransaction }}>
      <Head>
        <title>Budget App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </TransactionContext.Provider>
  );
}

export default MyApp;
