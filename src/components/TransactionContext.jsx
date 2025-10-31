import Card from "./ui/card";
import {
  getAccounts,
  getCyclesByAccount,
  runTransactionValidation,
} from "../api-client/api";
import React, { useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";

export default function TransactionContext() {
  const [accounts, setAccounts] = useState([]); // list of accounts for dropdown
  const [selectedAccount, setSelectedAccount] = useState(""); // currently selected account
  const [cycles, setCycles] = useState([]); // list of cycles for selected account
  const [selectedCycle, setSelectedCycle] = useState(""); // currently selected cycle
  const [transactionId, setTransactionId] = useState(""); // inputted transaction ID

  // Fetch accounts on mount
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const data = await getAccounts();
        setAccounts(data); // populate account dropdown
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    }
    fetchAccounts();
  }, []);

  // Fetch cycles whenever selectedAccount changes
  useEffect(() => {
    async function fetchCycles() {
      if (!selectedAccount) {
        setCycles([]); // clear cycles if no account selected
        setSelectedCycle(""); // reset selected cycle
        return;
      }
      try {
        const cyclesData = await getCyclesByAccount(selectedAccount);
        setCycles(cyclesData); // populate cycle dropdown
      } catch (err) {
        console.error("Error fetching cycles:", err);
      }
    }
    fetchCycles();
  }, [selectedAccount]);

  // Called when user clicks the submit button
  const handleSubmit = async () => {
    if (!selectedAccount || !selectedCycle || !transactionId) {
      alert("Please fill all fields!"); // basic validation
      return;
    }

    try {
      const result = await runTransactionValidation(
        selectedAccount,
        selectedCycle,
        transactionId
      );
      console.log("Validation result:", result); // log returned transaction validation
      alert("Transaction validated successfully!");
    } catch (err) {
      console.error("Error validating transaction:", err);
      alert("Failed to validate transaction.");
    }
  };

  return (
    <Card>
      <div style={{ padding: "1rem", textAlign: "left" }}>
        <h3>Transaction Context</h3>
        <p>
          Select the account, cycle, and enter the transaction ID for validation
        </p>

        {/* Responsive container for form fields */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {/* Account Dropdown */}
          <div
            style={{
              flex: "1 1 250px",
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "0 0 15px 0" }}>
              <label><strong>Account</strong></label>
            </div>

            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              style={{
                padding: "1rem",
                borderRadius: "0.75rem",
                backgroundColor: "#f4f5f6",
                color: "#000000",
                borderColor: "#f4f5f6"
              }}
            >
              <option value="">Select Account...</option>
              {accounts.map((account) => (
                <option key={account.Id} value={account.Id}>
                  {account.Name}
                </option>
              ))}
            </select>
          </div>

          {/* Cycle Dropdown */}
          <div
            style={{
              flex: "1 1 250px",
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "0 0 15px 0" }}>
              <label><strong>Cycle</strong></label>
            </div>
            <select
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value)}
              style={{
                padding: "1rem",
                borderRadius: "0.75rem",
                backgroundColor: "#f4f5f6",
                color: "#000000",
                borderColor: "#f4f5f6"
              }}
            >
              <option value="">Select Cycle...</option>
              {cycles.map((cycle) => (
                <option key={cycle.Id} value={cycle.Id}>
                  {cycle.Name}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction ID Input */}
          <div
            style={{
              flex: "1 1 250px",
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "0 0 15px 0" }}>
              <label><strong>Transaction ID</strong></label>
            </div>
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
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
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
 <AiOutlinePlayCircle size="2em" style={{paddingRight: "10px"}}/>
  <p style={{fontSize: "1rem"}}><strong>Run Validation</strong></p>
</button>

        </div>
      </div>
    </Card>
  );
}
