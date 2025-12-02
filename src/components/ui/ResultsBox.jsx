import React, { useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { ImBin } from "react-icons/im";
import { deleteRun } from "../../api-client/api.js";

export default function ResultsBox({ runs = [] }) {
  const [sortAsc, setSortAsc] = useState(true);

  const toggleSort = () => setSortAsc(!sortAsc);

  const sortedRuns = Array.isArray(runs)
    ? [...runs].sort((a, b) => {
        const dateA = a.createdAt
          ? new Date(a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000)
          : new Date(0);
        const dateB = b.createdAt
          ? new Date(b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000)
          : new Date(0);
        return sortAsc ? dateA - dateB : dateB - dateA;
      })
    : [];

    async function handleDelete(id) {
      try {
        await deleteRun(id);
      } catch (err) {
        console.warn('run could not be deleted: ', err)
      }
    }

  return (
    <div style={{ marginTop: "1rem", overflowX: "auto" }}>
      
      <table style={{ width: "100%", minWidth: "1400px", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f4f5f6" }}>
          <tr>
            <th onClick={toggleSort} style={{ textAlign: "left", padding: "8px", cursor: "pointer" }}>
              Date {sortAsc ? "▲" : "▼"}
            </th>
            <th style={{ textAlign: "left", padding: "8px" }}>Run Name</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Account</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Cycle</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Transaction ID</th>
            {/* <th style={{ textAlign: "left", padding: "8px" }}>Status</th> */}
            {/* <th style={{ textAlign: "left", padding: "8px" }}>Queue</th> */}
            {/* <th style={{ textAlign: "left", padding: "8px" }}>Pass Rate</th> */}
            <th style={{ textAlign: "left", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedRuns.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ padding: "12px", textAlign: "center" }}>
                No runs found for the selected filters.
              </td>
            </tr>
          ) : (
            sortedRuns.map((run) => {
              const runDate = run.createdAt
                ? new Date(run.createdAt.seconds * 1000 + run.createdAt.nanoseconds / 1000000)
                : "-";
              return (
                <tr key={run.uploadId + runDate}>
                  <td style={{ padding: "8px" }}>{runDate !== "-" ? runDate.toLocaleString() : "-"}</td> 
                  <td style={{ padding: "8px" }}>{run.uploadId || "-"}</td>
                  <td style={{ padding: "8px" }}>{run.cyclrInfo?.accountId || "-"}</td>
                  <td style={{ padding: "8px" }}>{run.cyclrInfo?.cycleId || "-"}</td>
                  <td style={{ padding: "8px" }}>{run.cyclrInfo?.transactionId || "-"}</td>
                  {/* <td style={{ padding: "8px" }}>{run.status || "-"}</td> */}
                  {/* <td style={{ padding: "8px" }}>{run.queue || "-"}</td> */}
                  {/* <td style={{ padding: "8px" }}>{run.passRate != null ? `${run.passRate}%` : "-"}</td> */}
                  <td style={{ padding: "8px" }}>
                    <button style={{ padding: "4px 8px", borderRadius: "4px", cursor: "pointer", border: "none", }}>
                      <IoPlayOutline />
                    </button>
                    <button style={{ padding: "4px 8px", borderRadius: "4px", cursor: "pointer", border: "none", }} onClick={() => handleDelete(run.runId)}>
                      <ImBin />
                    </button>
                  </td>
                </tr> 
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
