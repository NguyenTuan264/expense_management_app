import { View, Text } from "react-native";
import {
  DEFAULT_SPENDCATEGORIES,
  DEFAULT_REVENUECATEGORIES,
} from "../constants/categories";
import { createContext, useState } from "react";

// Tạo kho chứa
export const CategoryContext = createContext<any>(null);

// Giúp phân phối dữ liệu cho các màn hình
export const CategoryProvider = ({ children }: any) => {
  const [spendCategories, setSpendCategories] = useState(
    DEFAULT_SPENDCATEGORIES
  );
  const [revenueCategories, setRevenueCategories] = useState(
    DEFAULT_REVENUECATEGORIES
  );

  return (
    <CategoryContext.Provider
      value={{
        spendCategories,
        setSpendCategories,
        revenueCategories,
        setRevenueCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
