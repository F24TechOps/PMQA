import React, { useEffect, useState } from "react";
import Card from "./ui/card";
import { AiOutlinePlayCircle } from "react-icons/ai";
import {
  getAccounts,
  getCyclesByAccount,
  runTransactionValidation,
  sendExpectedFieldUpload,
  sendRunData,
} from "../api-client/api";

import AccountDropdown from "./ui/AccountDropdown";
import CycleDropdown from "./ui/CycleDropdown";

export default function TransactionContext({ expectedFields, actualJson, onRunResult }) {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [cycles, setCycles] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // Fetch accounts on mount
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    }
    fetchAccounts();
  }, []);

  // Fetch cycles when selectedAccount changes
  useEffect(() => {
    async function fetchCycles() {
      if (!selectedAccount) {
        setCycles([]);
        setSelectedCycle("");
        return;
      }
      try {
        const cyclesData = await getCyclesByAccount(selectedAccount);
        setCycles(cyclesData);
      } catch (err) {
        console.error("Error fetching cycles:", err);
      }
    }
    fetchCycles();
  }, [selectedAccount]);

  const handleSubmit = async () => {
    if (!selectedAccount || !selectedCycle || !transactionId) {
      //this should be visual
      alert("Please fill all fields!");
    }

    try {
      await runTransactionValidation(
        selectedAccount,
        selectedCycle,
        transactionId
      );
    } catch (err) {
      console.error("Error validating transaction:", err);
      alert(
        "Failed to validate transaction. Please check your inputs & try again. If this issue persists please raise a ticket with Technical Services"
      );
    }

    const uploadId = await sendExpectedFieldUpload(expectedFields);

    const runData = {
      expectedFields: expectedFields,
      actualOutput: actualJson,
      transactionContext: {
        accountId: selectedAccount,
        cycleId: selectedCycle,
        transactionId: transactionId,
      },
      uploadId: uploadId,
    };

    try {
      const res = await sendRunData(runData);
      
      if (onRunResult) {
        onRunResult(res)
      }
    } catch (err) {
      console.warn("Error starting run.", err);
    }
  };

  return (
    <Card>
      <div style={{ padding: "1rem", textAlign: "left" }}>
        <h3>Transaction Context</h3>
        <p>
          Select the account, cycle, and enter the transaction ID for validation
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
            <AccountDropdown
              accounts={accounts}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
            />
          </div>

          <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
            <CycleDropdown
              cycles={cycles}
              selectedCycle={selectedCycle}
              setSelectedCycle={setSelectedCycle}
            />
          </div>

          <div
            style={{
              flex: "1 1 250px",
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>
              <strong>Transaction ID</strong>
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter Transaction ID..."
              style={{
                padding: "1rem",
                borderRadius: "0.75rem",
                backgroundColor: "#f4f5f6",
                color: "#000000",
                border: "1px solid #f4f5f6",
                outline: "none",
                marginTop: "1rem",
              }}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <button
            onClick={handleSubmit}
            style={{
              padding: "0.25rem 0.75rem",
              backgroundColor: "#3a86e9",
              color: "#ffffff",
              border: "none",
              borderRadius: "1rem",
              width: "200px",
              maxWidth: "90%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AiOutlinePlayCircle size="2em" style={{ paddingRight: "10px" }} />
            <p style={{ fontSize: "1rem" }}>
              <strong>Run Validation</strong>
            </p>
          </button>
        </div>
      </div>
    </Card>
  );
}
