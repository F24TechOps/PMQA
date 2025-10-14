import axios from "axios";

const baseURL = "http://localhost:4000/api";

/**
 *
 * @param {object} runData {
 * expectedFields: [], actualOutput: {}, transactionContext: {accountId: string, cycleId: string, transactionId: string}
 * }
 * @returns
 */
export async function sendRunData(runData) {
  return await axios.post(`${baseURL}/run`, runData);
}

export async function getHistoricRuns() {
  return await axios.get(`${baseURL}/runs`);
}

export async function getResults() {
  return await axios.get(`${baseURL}/results`);
}
