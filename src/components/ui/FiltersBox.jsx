import React from "react";
import DataDropdown from "./AccountDropdown";
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
          <DataDropdown
            data={accounts}
            selectedData={filters.account}
            setSelectedData={(value) =>
              setFilters({ ...filters, account: value, cycle: "" })
            }
            label="Account"
          />
        </div>

        {/* Cycle */}
        <div style={{ flex: "1 1 22%", minWidth: "220px" }}>
          <DataDropdown
            data={cycles}
            selectedData={filters.cycle}
            setSelectedData={(value) =>
              setFilters({ ...filters, cycle: value })
            }
            label="Cycle"
          />
        </div>

        {/* Date From */}
        <div
          style={{
            flex: "1 1 22%",
            minWidth: "220px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ marginBottom: 0}}>
            <strong>Date From</strong>
          </p>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
            style={{
              padding: "0.9rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              backgroundColor: "#f4f5f6",
              marginTop: "1rem",
            }}
          />
        </div>

        {/* Date To */}
        <div
          style={{
            flex: "1 1 22%",
            minWidth: "220px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ marginBottom: 0}}>
            <strong>Date To</strong>
          </p>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            style={{
              padding: "0.9rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              backgroundColor: "#f4f5f6",
              marginTop: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}
