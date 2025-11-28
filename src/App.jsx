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
import { getResultsById } from "./api-client/api.js";

function App() {
  const [expectedFields, setExpectedFields] = useState([]);
  const [actualJson, setActualJson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resultsTriggered, setResultsTriggered] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [cycle, setCycle] = useState(null);
  const [selectedAccountName, setSelectedAccountName] = useState("");
  const [selectedCycleName, setSelectedCycleName] = useState("");

  const fetchResults = async (accountId, transactionId) => {
    setIsResultsLoading(true);
    try {
      const res = await getResultsById(accountId, transactionId);
      console.log("Fetched results:", res);
      setResultsData(res);
    } catch (err) {
      console.error("Failed fetching results:", err);
    } finally {
      setIsResultsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // test for console
  useEffect(() => {
    console.log("Expected Fields changed:", expectedFields);
  }, [expectedFields]);

  useEffect(() => {
    console.log("Actual JSON changed:", actualJson);
  }, [actualJson]);

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
                  onChange={() => {}}
                />

                <UploadSection
                  title="Actual Output (JSON)"
                  description="Paste the JSON response from Cyclr transaction logs"
                  onChange={() => {}}
                />
              </div>
              <TransactionContext
                setAccount={setAccount}
                setCycle={setCycle}
                setSelectedAccountName={setSelectedAccountName}
                setSelectedCycleName={setSelectedCycleName}
                onSuccess={() => {
                  console.log(
                    "Validation ran, results can be fetched or updated here"
                  );
                }}
                onRunValidation={(result, transactionId) => {
                  // <-- receive transactionId
                  if (account && transactionId) {
                    fetchResults(account, transactionId); // <-- use transactionId instead of cycle
                    setResultsTriggered(true); // show panels
                  }
                }}
              />

              <EmptyValidation />
              {resultsTriggered && (
                <>
                  <SummaryPanel
                    summary={resultsData?.results?.summary}
                    loading={isResultsLoading}
                    account={account}
                    cycle={cycle}
                    selectedAccountName={selectedAccountName}
                    selectedCycleName={selectedCycleName}
                  />

                  <ResultsTable
                    fields={resultsData?.results?.fields}
                    loading={isResultsLoading}
                  />
                </>
              )}

              {/* <ResultsTable results={resultsTriggered} /> */}
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
