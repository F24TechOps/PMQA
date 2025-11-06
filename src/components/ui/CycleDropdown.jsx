import React from "react";

export default function CycleDropdown({ cycles = [], selectedCycle, setSelectedCycle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label><strong>Cycle</strong></label>
      <select
        value={selectedCycle}
        onChange={(e) => setSelectedCycle(e.target.value)}
        style={{
          padding: "0.75rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
          backgroundColor: "#f4f5f6",
          marginTop: "1rem"
        }}
      >
        <option value="">Select Cycle...</option>
        {cycles.map((cycle) => (
          <option key={cycle.Id || cycle.id} value={cycle.Id || cycle.id}>
            {cycle.Name || cycle.name}
          </option>
        ))}
      </select>
    </div>
  );
}
