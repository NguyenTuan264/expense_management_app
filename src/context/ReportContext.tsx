import React, { createContext, useState } from "react";

export const ReportContext = createContext<any>(null);

export const ReportProvider = ({ children }: any) => {
  // Đưa state activeTab ra dùng chung, mặc định là "spend"
  const [activeTab, setActiveTab] = useState<"spend" | "revenue">("spend");

  return (
    <ReportContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ReportContext.Provider>
  );
};
