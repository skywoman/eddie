// Further Google Sheet authentication info:
// https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./credentials.json'); // the file saved above
const doc = new GoogleSpreadsheet('1jUmyIicsyirDEzTJoyIKV0wRkXQsOv5Ilhc1G-WZiJc');

(async function() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  // 1. Strip away mutual aid, merch, and wholesale rows
  // 2. Create a second sheet with just the order items, for the picklist generator
  
  /*
  await doc.updateProperties({ title: 'renamed doc' });

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  console.log(sheet.title);
  console.log(sheet.rowCount);

  // adding / removing sheets
  const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
  await newSheet.delete();*/


}());


