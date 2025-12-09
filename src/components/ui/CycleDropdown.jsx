import React from "react";

export default function CycleDropdown({
  cycles = [],
  selectedCycle,
  setSelectedCycle,
  disabled,
  isLoading,
}) {
  const showLoadingMessage = !disabled && isLoading;
  const showNoResultsMessage = !disabled && !isLoading && cycles.length === 0;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>
        <strong>Cycle</strong>
      </label>

      <select
        disabled={disabled}
        value={selectedCycle}
        onChange={(e) => setSelectedCycle(e.target.value)}
        style={{
          padding: "0.9rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
          backgroundColor: disabled ? "#e4e4e4" : "#f4f5f6",
          marginTop: "1rem",
        }}
      >
        {disabled && <option value="">Select Cycle...</option>}

        {showLoadingMessage && <option value="">Loading...</option>}

        {showNoResultsMessage && <option value="">No cycles found</option>}

        {!disabled && !isLoading && cycles.length > 0 && (
          <>
            <option value="">Select Cycle...</option>
            {cycles.map((cycle) => (
              <option key={cycle.Id || cycle.id} value={cycle.Id || cycle.id}>
                {cycle.Name || cycle.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}
