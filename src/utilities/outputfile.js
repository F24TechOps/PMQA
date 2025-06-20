import { saveAs } from 'file-saver';

function exportFile(contacts) {
const fields = [...new Set(contacts.map(contact => Object.keys(contact)).flat(1))];

const headers = ["Fields"]

const rows = []

for(const field of fields) {
    rows.push([field, ...contacts.map(contact => contact[field])].join(", "))
}

for (let i = 1; i <= contacts.length; i++) {
    headers.push(`Person ${i}`)
}

rows.unshift(headers.join(", "))

const handleDownload = () => {
    const dataToWrite = rows.map(record => `${record}\n`)
    const file = new Blob([...dataToWrite], { type: 'application/vnd.ms-excel' });
    saveAs(file, 'QA.csv');
  };

  handleDownload();
}

export {exportFile}