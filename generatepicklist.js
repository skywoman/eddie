// Square -> Integromat -> Google Sheets -> CSV collation of order picklist

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('/Users/chrisnewman/desktop/orders.txt');

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

  console.log(map);
}

processLineByLine();

