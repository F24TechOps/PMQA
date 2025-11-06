import React, { useState, useEffect } from "react";
import Card from "./ui/card";
import FiltersBox from "./ui/FiltersBox";
import ResultsBox from "./ui/ResultsBox";
import {
  getAccounts,
  getCyclesByAccount,
  getHistoricRuns,
} from "../api-client/api";

export default function TransactionHistory() {
  const [accounts, setAccounts] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [runs, setRuns] = useState([]);
  const [filteredRuns, setFilteredRuns] = useState([]);
  const [filters, setFilters] = useState({
    account: "",
    cycle: "",
    dateFrom: "",
    dateTo: "",
  });

  // Fetch accounts
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const res = await getAccounts();
        setAccounts(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Error fetching accounts:", err);
        setAccounts([]);
      }
    }
    fetchAccounts();
  }, []);

  // Fetch cycles when account changes
  useEffect(() => {
    async function fetchCycles() {
      if (!filters.account) {
        setCycles([]);
        setFilters((prev) => ({ ...prev, cycle: "" }));
        return;
      }
      try {
        const res = await getCyclesByAccount(filters.account);
        setCycles(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Error fetching cycles:", err);
        setCycles([]);
      }
    }
    fetchCycles();
  }, [filters.account]);

  // Fetch historic runs
  useEffect(() => {
    async function fetchRuns() {
      try {
        const res = await getHistoricRuns();
        const data = res?.data?.data;
        if (Array.isArray(data)) {
          setRuns(data);
          setFilteredRuns(data);
        } else {
          setRuns([]);
          setFilteredRuns([]);
        }
      } catch (err) {
        console.error("Error fetching runs:", err);
        setRuns([]);
        setFilteredRuns([]);
      }
    }
    fetchRuns();
  }, []);

  // Filter runs whenever filters or runs change
  useEffect(() => {
    if (!runs || runs.length === 0) {
      setFilteredRuns([]);
      return;
    }

    const filtered = runs.filter((run) => {
      const accountMatch = filters.account
        ? run.cyclrInfo?.accountId === filters.account
        : true;

      const cycleMatch = filters.cycle
        ? run.cyclrInfo?.cycleId === filters.cycle
        : true;

      const runDate = run.createdAt
        ? new Date(
            run.createdAt.seconds * 1000 + run.createdAt.nanoseconds / 1000000
          )
        : null;

      const dateFromMatch =
        filters.dateFrom && runDate
          ? runDate >= new Date(filters.dateFrom)
          : true;

      const dateToMatch =
        filters.dateTo && runDate ? runDate <= new Date(filters.dateTo) : true;

      return accountMatch && cycleMatch && dateFromMatch && dateToMatch;
    });

    setFilteredRuns(filtered);
  }, [filters, runs]);

  return (
    <div style={{ padding: "0 20px", marginTop: "4rem" }}>
      {/* Page header */}
      <div style={{ marginBottom: "20px" }}>
        <h1>Validation History</h1>
        <p>View and manage past validation runs</p>
      </div>

      {/* Filters Box */}
      <Card
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto 30px",
          padding: "20px",
        }}
      >
        <FiltersBox
          filters={filters}
          setFilters={setFilters}
          accounts={accounts}
          cycles={cycles}
        />
      </Card>

      {/* Results Box */}
      <Card
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <ResultsBox runs={filteredRuns} />
      </Card>
    </div>
  );
}
