import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EmptyValidation from "./components/EmptyValidation.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import TransactionContext from "./components/TransactionContext.jsx";
import Header from "./components/ui/header.jsx";
import UploadSection from "./components/UploadSection.jsx";
import TransactionHistory from "./components/TransactionHistory.jsx";
import { useState, useEffect } from "react";
import { sendRunData } from "./api-client/api.js";

function App() {
  const [expectedFields, setExpectedFields] = useState([]);
  const [actualJson, setActualJson] = useState(null);
  const [transactionContext, setTransactionContext] = useState(null);

  // test for console
   useEffect(() => {
    console.log("Expected Fields changed:", expectedFields);
  }, [expectedFields]);

  useEffect(() => {
    console.log("Actual JSON changed:", actualJson);
  }, [actualJson]);

  useEffect(() => {
    const payload = {
      expectedFields, 
      actualOutput: actualJson,
      transactionContext
    } 
    console.log("sending payload to server", payload)

    sendRunData(payload)
    .then((res) => {
      console.log("response data:", res.data)
    })
    .catch((err) => {
      console.log("error sending data", err)
    })
  }, [expectedFields, actualJson, transactionContext])

  return (
    <Router>
      {/* Header is always visible */}
      <Header className="header-component" />

      {/* Page content below header */}
      <Routes>
        {/* Main page content */}
        <Route
          path="/"
          element={
            <div className="App">
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
          }
        />

        {/* History page content */}
        <Route path="/history" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
