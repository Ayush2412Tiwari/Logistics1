const xlsx = require('xlsx');
const path = require('path');

function getLoginData() {
  const filePath = path.join(__dirname, '../testData/LoginData.xlsx');

  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = xlsx.utils.sheet_to_json(sheet);

  return data;
}

module.exports = { getLoginData };