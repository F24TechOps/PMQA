import "./App.css";
import EmptyValidation from "./components/EmptyValidation.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import TransactionContext from "./components/TransactionContext.jsx";
import Header from "./components/ui/header.jsx";
import UploadSection from "./components/UploadSection.jsx";

function App() {
  return (
    <div className="App">
      <Header className="header-component" />
      <div className="input-section">
        <UploadSection
          title="Expected Fields"
          description="Upload or paste the list of fields that should exist in the workflow output"
        />
        <UploadSection
          title="Actual Output (JSON)"
          description="Paste the JSON response from Cyclr transaction logs"
        />
      </div>
      <TransactionContext className="transaction-component" />
      <EmptyValidation />
      <SummaryPanel />
      <ResultsTable />
    </div>
  );
}

export default App;
