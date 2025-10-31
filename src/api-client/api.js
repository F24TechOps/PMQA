import axios from "axios";

const baseURL = "http://localhost:4000/api/qa";

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

export async function getAccounts() {
  const response = await axios.get(`${baseURL}/accounts`);
  return response.data;
}

export async function getCyclesByAccount(accountID) {
  const response = await axios.get(`${baseURL}/${accountID}/cycles`);
  return response.data;
}

export async function runTransactionValidation(accountID, cycleID, transactionID) {
  const { data } = await axios.get(
    `${baseURL}/transactions/${accountID}/${cycleID}/${transactionID}`
  );
  return data.transaction?.Response;
}

