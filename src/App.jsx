import "./App.css";
import EmptyValidation from "./components/EmptyValidation.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import TransactionContext from "./components/TransactionContext.jsx";
import Header from "./components/ui/header.jsx";
import UploadSection from "./components/UploadSection.jsx";
import { useState, useEffect } from "react";

function App() {
  const [expectedFields, setExpectedFields] = useState([]);
  const [actualJson, setActualJson] = useState(null);

  // test for console
   useEffect(() => {
    console.log("Expected Fields changed:", expectedFields);
  }, [expectedFields]);

  useEffect(() => {
    console.log("Actual JSON changed:", actualJson);
  }, [actualJson]);

  return (
    <div className="App">
      <Header className="header-component" />
      <div className="input-section">
        <UploadSection
          title="Expected Fields"
          description="Upload or paste the list of fields that should exist in the workflow output"
          type="fields"
          onChange={setExpectedFields} 
        />
         <UploadSection
          title="Actual Output (JSON)"
          description="Paste the JSON response from Cyclr transaction logs"
          type="json"
          onChange={setActualJson}
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
