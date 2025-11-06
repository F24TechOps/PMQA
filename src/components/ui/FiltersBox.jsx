import React from "react";
import AccountDropdown from "./AccountDropdown";
import CycleDropdown from "./CycleDropdown";

export default function FiltersBox({ filters, setFilters, accounts, cycles }) {
  return (
    <div>
      <h4>Filters</h4>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "0.5rem",
        }}
      >
        {/* Account */}
        <div style={{ flex: "1 1 22%", minWidth: "220px" }}>
          <AccountDropdown
            accounts={accounts}
            selectedAccount={filters.account}
            setSelectedAccount={(value) =>
              setFilters({ ...filters, account: value, cycle: "" })
            }
          />
        </div>

        {/* Cycle */}
        <div style={{ flex: "1 1 22%", minWidth: "220px" }}>
          <CycleDropdown
            cycles={cycles}
            selectedCycle={filters.cycle}
            setSelectedCycle={(value) => setFilters({ ...filters, cycle: value })}
          />
        </div>

        {/* Date From */}
        <div style={{ flex: "1 1 22%", minWidth: "220px", display: "flex", flexDirection: "column" }}>
          <label><strong>Date From</strong></label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              backgroundColor: "#f4f5f6",
              marginTop: "1rem"
            }}
          />
        </div>

        {/* Date To */}
        <div style={{ flex: "1 1 22%", minWidth: "220px", display: "flex", flexDirection: "column" }}>
          <label><strong>Date To</strong></label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              backgroundColor: "#f4f5f6",
              marginTop: "1rem"
            }}
          />
        </div>
      </div>
    </div>
  );
}
