// Square -> Integromat -> Google Sheets -> CSV collation of order picklist

const config = require('./config');
const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {

  const fileStream = fs.createReadStream(config.INPUT_FILE_PATH);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  var map = {};

  for await (const line of rl) {
  	if(line.trim() !== "\""){
  		var tokens = line.split(":");
  		var key = tokens[0].trim();
  		var value = parseInt(tokens[1].trim());

  		if(key in map){
  			map[key] = map[key]+value;
  		}
  		else{
  			map[key] = value;
  		}
  	}

  }

  console.log(sortObjectByKeys(map));
}

function sortObjectByKeys(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

processLineByLine();

