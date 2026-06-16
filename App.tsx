import "./global.css";
import AppNavigator from "./src/navigation/AppNavigator";
import { CategoryProvider } from "./src/context/CategoryContext";
import { TransactionProvider } from "./src/context/TransactionContext";
import { ReportProvider } from "./src/context/ReportContext";

export default function App() {
  return (
    <CategoryProvider>
      <TransactionProvider>
        <ReportProvider>
          <AppNavigator />
        </ReportProvider>
      </TransactionProvider>
    </CategoryProvider>
  );
}
