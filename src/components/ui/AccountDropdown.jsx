import React from "react";
import Select from "react-select";

export default function AccountDropdown({ accounts = [], selectedAccount, setSelectedAccount }) {
  const options = accounts.map(acc => ({
    value: acc.Id || acc.id,
    label: acc.Name || acc.name
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label><strong>Account</strong></label>
    <Select
  value={options.find(opt => opt.value === selectedAccount) || null}
  onChange={(option) => setSelectedAccount(option?.value || "")}
  options={options}
  placeholder="Select Account..."
  isClearable
  styles={{
    control: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      border: "1px solid #ccc",
      backgroundColor: "#f4f5f6",
      padding: "0.25rem",
      marginTop: "1rem",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0 0 0.5rem 0.5rem",
    }),
    option: (base) => ({
      ...base,
      padding: "0.75rem",
    }),
  }}
/>
    </div>
  );
}
