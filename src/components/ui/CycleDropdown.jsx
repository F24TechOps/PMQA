import Select from "react-select";

export default function CycleDropdown({
  cycles = [],
  selectedCycle,
  setSelectedCycle,
}) {
  const options = cycles.map((cycle) => ({
    value: cycle.Id || cycle.id,
    label: cycle.Name || cycle.name,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>
        <strong>Cycle</strong>
      </p>
      <Select
        value={options.find((option) => option.value === selectedCycle) || null}
        onChange={(e) => setSelectedCycle(e?.value)}
        options={options}
        placeholder="Select Cycle..."
        isClearable
        style={{
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
