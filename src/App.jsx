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
import { getResults, sendRunData } from "./api-client/api.js";

function App() {
  const [expectedFields, setExpectedFields] = useState([]);
  const [actualJson, setActualJson] = useState(null);
  const [resultId, setResultId] = useState(null);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (!resultId || !resultId.runId || !resultId.resultId) return;

    async function getResult() {
      const res = await getResults(resultId.runId, resultId.resultId);
      setResultData(res.data.results.resultsObj);
    }

    getResult();
  }, [resultId]);

  console.log(resultData);

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
              <TransactionContext
                className="transaction-component"
                expectedFields={expectedFields}
                actualJson={actualJson}
                onRunResult={setResultId}
              />
              {resultData ? (
                <div>
                  <SummaryPanel runResult={resultData.summary} />
                  <ResultsTable runResult={resultData.fields} />
                </div>
              ) : (
                <EmptyValidation />
              )}
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
