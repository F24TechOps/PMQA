import Card from "./ui/card";
import { useState, useEffect } from "react";

export default function ResultsTable({ fields }) {
  const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
    if (fields) {
      setIsLoading(false);
    }
  }, [fields]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!fields) {
    return (
      <Card>
        <p>No field data found.</p>
      </Card>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Correct":
        return {
          backgroundColor: "#21C4A6",
          color: "white",
          padding: "0.25rem 0.5rem",
          borderRadius: "1rem",
          textAlign: "center",
          display: "inline-block",
        };
      case "Missing":
        return {
          backgroundColor: "#D74242",
          color: "white",
          padding: "0.25rem 0.5rem",
          borderRadius: "1rem",
          textAlign: "center",
          display: "inline-block",
        };
      case "Extra":
        return {
          backgroundColor: "#0080FF",
          color: "white",
          padding: "0.25rem 0.5rem",
          borderRadius: "1rem",
          textAlign: "center",
          display: "inline-block",
        };
      default:
        return {
          backgroundColor: "#414141ff",
          color: "white",
          padding: "0.25rem 0.5rem",
          borderRadius: "1rem",
          textAlign: "center",
          display: "inline-block",
        };
    }
  };

  const getSymbol = (fieldName, status) => {
    const style = { fontWeight: "bold", fontSize: "1.2rem" };

    if (status === "Extra")
      return <span style={{ ...style, color: "#0080FF" }}>+</span>;
    if (status === "Correct")
      return <span style={{ ...style, color: "#21C4A6" }}>✓</span>;
    if (status === "Missing")
      return <span style={{ ...style, color: "#D74242" }}>✗</span>;

    return <span style={style}></span>;
  };


  return (
    <Card className="no-padding-card">
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr>
            <th
              style={{
                padding: "0.5rem",
                borderBottom: "2px solid #ccc",
                backgroundColor: "#F9F9FA",
              }}
            >
            </th>
            <th
              style={{
                padding: "0.5rem",
                borderBottom: "2px solid #ccc",
                backgroundColor: "#F9F9FA",
              }}
            >
              Field Name
            </th>
            <th
              style={{
                padding: "0.5rem",
                borderBottom: "2px solid #ccc",
                backgroundColor: "#F9F9FA",
              }}
            >
              Status
            </th>
            <th
              style={{
                padding: "0.5rem",
                borderBottom: "2px solid #ccc",
                backgroundColor: "#F9F9FA",
              }}
            >
              Value
            </th>
            <th
              style={{
                padding: "0.5rem",
                borderBottom: "2px solid #ccc",
                backgroundColor: "#F9F9FA",
              }}
            >
              Reason
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(fields).map(([fieldName, details]) => (
            <tr key={fieldName}>
              <td
                style={{
                  padding: "0.5rem",
                  borderBottom: "1px solid #e0e0e0",
                  textAlign: "center",
                }}
              >
                {getSymbol(fieldName, details.status)}
              </td>
              <td
                style={{ padding: "0.5rem", borderBottom: "1px solid #e0e0e0" }}
              >
                {fieldName}
              </td>
              <td
                style={{ padding: "0.5rem", borderBottom: "1px solid #e0e0e0" }}
              >
                <span style={getStatusStyle(details.status)}>
                  {details.status}
                </span>
              </td>
              <td
                style={{ padding: "0.5rem", borderBottom: "1px solid #e0e0e0" }}
              >
                {details.value || "-"}
              </td>
              <td
                style={{ padding: "0.5rem", borderBottom: "1px solid #e0e0e0" }}
              >
                {details.reason || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
