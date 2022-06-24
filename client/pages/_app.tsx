import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

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
      <Component {...pageProps} />
    </TransactionContext.Provider>
  );
}

export default MyApp;
