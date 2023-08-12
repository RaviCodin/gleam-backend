// Google sheet npm package
const { GoogleSpreadsheet } = require('google-spreadsheet');

// File handling package
const fs = require('fs');


// spreadsheet key is the long id in the sheets URL
const RESPONSES_SHEET_ID = '163nH9exE59mjJvwdMhtnRT4ljeCbVe81_oBbYmXNjFg';

// Create a new document
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

// Credentials for the service account
// const CREDENTIALS = JSON.parse(fs.readFileSync('fragrensFiles.json'));
const CREDENTIALS = require('./fragrensFile.json');

// console.log(CREDENTIALS.client_email)


 const sheetAdd = async(row) =>{

// use service account creds
await doc.useServiceAccountAuth({
  client_email: CREDENTIALS.client_email,
  private_key: CREDENTIALS.private_key
});

await doc.loadInfo();

// Index of the sheet
let sheet = doc.sheetsByIndex[0];

// for (let index = 0; index < rows.length; index++) {
//   const row = rows[index];
//   await sheet.addRow(row);
// }


await sheet.addRow(row);

}
module.exports = sheetAdd
