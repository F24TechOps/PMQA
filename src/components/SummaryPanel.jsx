import Card from "./ui/card";
//import { useState, useEffect } from "react";

export default function SummaryPanel({
  summary,
  selectedAccountName,
  selectedCycleName,
  selectedTransactionId
}) {

  if (!summary) {
    return (
      <Card>
        <p>No summary available.</p>
      </Card>
    );
  }

  const totalFields =
    summary.correct +
    summary.missing +
    summary.extra +
    summary.warning +
    summary.null;

  //const passRate = totalFields > 0 ? Math.round((summary.correct / totalFields) * 100) : 0;

  const summaryItems = [
    { label: "Total Fields", value: totalFields, icon: "✓" },
    { label: "Correct", value: summary.correct, icon: "✅" },
    { label: "Null Fields", value: summary.null, icon: "❗" },
    { label: "Missing Fields", value: summary.missing, icon: "❌" },
    { label: "Warning Fields", value: summary.warning, icon: "⚠️" },
    { label: "Extra Fields", value: summary.extra, icon: "➕" },
  ];

  return (
    <Card>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Validation Summary</h3>

        <div style={{ textAlign: "right" }}>
          {/*<p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              margin: 0,
              color: "#8d8dfa",
            }}
          >
            {passRate}%
          </p>
          <p>Pass Rate</p> */}
        </div>
      </div>
      <div style={{ textAlign: "left" }}>
        <p>
          Workflow: {selectedAccountName} - {selectedCycleName} - {selectedTransactionId}
        </p>
      </div>

      {/* Summary Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {summaryItems.map((item) => (
          <div
            key={item.label}
            style={{
              flex: "1 1 calc(30% - 1rem)",
              minWidth: "150px",
              background: "#f4f5f6",
              borderRadius: "0.75rem",
              padding: "1rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              {/* Icon */}
              <span
                style={{
                  fontSize: "1.5rem",
                  width: "2.5rem",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                {item.icon}
              </span>

              {/* Value + Label */}
              <div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    marginTop: "0.25rem",
                    textAlign: "left",
                  }}
                >
                  {item.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
