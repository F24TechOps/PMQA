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
import { getResults } from "./api-client/api.js";

function App() {
  const [expectedFields, setExpectedFields] = useState([]);
  const [actualJson, setActualJson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAccountName, setSelectedAccountName] = useState("");
  const [selectedCycleName, setSelectedCycleName] = useState("");
  const [selectedTransactionId, setSelectedTransactionId] = useState("")
  const [resultId, setResultId] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!resultId || !resultId.runId || !resultId.resultId) return;

    async function getResult() {
      setIsResultsLoading(true);
      try {
        const res = await getResults(resultId.runId, resultId.resultId);
        setResultData(res.data.results.resultsObj);
      } finally {
        setIsResultsLoading(false);
      }
    }

    getResult();
  }, [resultId]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>

        <img
          src="https://media1.tenor.com/m/WX_LDjYUrMsAAAAC/loading.gif"
          alt="loading symbol"
        />
        <p>Loading...</p>
      </div>
    );
  }
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
                onRunResult={(ids) => {
                  //setIsResultsLoading(true);
                  setResultId(ids);
                }}
                setSelectedAccountName={setSelectedAccountName}
                setSelectedCycleName={setSelectedCycleName}
                setSelectedTransactionId={setSelectedTransactionId}
              />
              {!resultData && <EmptyValidation />}

              {/* FOR IMPLEMENTING LOADING
              {isResultsLoading && (
                <div className="loader-container">
                  <div className="loader"></div>
                  <img
                    src="https://media1.tenor.com/m/WX_LDjYUrMsAAAAC/loading.gif"
                    alt="loading symbol"
                  />
                  <p>Loading...</p>
                </div>
              )}*/}
              {!isResultsLoading && resultData && (
                <>
                  <SummaryPanel
                    summary={resultData?.summary}
                    selectedAccountName={selectedAccountName}
                    selectedCycleName={selectedCycleName}
                    selectedTransactionId={selectedTransactionId}
                  />

                  <ResultsTable fields={resultData.fields} />
                </>
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
