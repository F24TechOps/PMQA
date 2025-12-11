import axios from "axios";

const baseURL = 'https://pmqa-be.onrender.com/api/qa'

/**
 *
 * @param {object} runData {
 * expectedFields: [], actualOutput: {}, transactionContext: {accountId: string, cycleId: string, transactionId: string}
 * }
 * @returns
 */
export async function sendRunData(runData) {
  const res = await axios.post(`${baseURL}/runs`, runData);
  return res.data
}

export async function getHistoricRuns() {
  return await axios.get(`${baseURL}/runs`);
}

export async function getResults(runId, resultId) {
  return await axios.get(`${baseURL}/runs/${runId}/result/${resultId}`);
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
  return data;
}

export async function sendExpectedFieldUpload(expectedFields) {
  const res = await axios.post(`${baseURL}/uploads`, expectedFields);
  return res.data.uploadID;
}

export async function deleteRun(runId) {
  return await axios.delete(`${baseURL}/run/${runId}`);
}
