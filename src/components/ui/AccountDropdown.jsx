import React from "react";

export default function AccountDropdown({ accounts = [], selectedAccount, setSelectedAccount }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label><strong>Account</strong></label>
      <select
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
        style={{
          padding: "0.75rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
          backgroundColor: "#f4f5f6",
          marginTop: "1rem"
        }}
      >
        <option value="">Select Account...</option>
        {accounts.map((acc) => (
          <option key={acc.Id || acc.id} value={acc.Id || acc.id}>
            {acc.Name || acc.name}
          </option>
        ))}
      </select>
    </div>
  );
}
