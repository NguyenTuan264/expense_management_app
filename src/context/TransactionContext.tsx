import React, { createContext, useState } from "react";

export const TransactionContext = createContext<any>(null);

export const TransactionProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  // Thêm danh mục
  const addTransaction = (newTransaction: any) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  // Sửa danh mục
  const updateTransaction = (updatedTransaction: any) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
  };

  // Xoá danh mục
  const deleteTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
