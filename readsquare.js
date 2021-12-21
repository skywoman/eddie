// To run: node -r esm readsquare.js

import { Client, Environment } from 'square'

const client = new Client({
  environment: Environment.Production,
  accessToken: 'EAAAEBGg1WiL0W_vVcoclENFIWmmcifaSgE-3JgLJS1w7SjMt8HbsPzMPRoYuqh2',
})

const ordersApi = client.ordersApi;

var map = {};
var totalPurchaseValue = 0.0;

async function searchOrders () {

	var resultsArray = new Array();
	var cursorPresent = '';

	do{
		try {
		  const response = await client.ordersApi.searchOrders({
		    locationIds: [
		      'AB4HBYP24XMZW'
		    ],
		    query: {
		      filter: {
		        stateFilter: {
		          states: [
		            'OPEN'
		          ]
		        },
		        dateTimeFilter: {
		          createdAt: {
		            startAt: '2021-10-24T00:00:00+00:00'
		          }
		        }
		      }
		    },
		    limit: 500,
		    returnEntries: false,
		    cursor: cursorPresent
		  });

		  if(response.result.cursor){
		  	cursorPresent = response.result.cursor;	  	
		  }
		  else{
		  	cursorPresent = '';
		  }

		  resultsArray.push(response.result);

		} catch(error) {
		  console.log(error);
		}
	} while (cursorPresent != '');

	return resultsArray;
	
};


function addLineItemsToMap(order){

	try {

		const lineItems = order.lineItems;
		lineItems.forEach(function(lineItem) {
			if(!lineItem.name.toUpperCase().includes("MUTUAL") && 
				 !lineItem.name.toUpperCase().includes("WHOLESALE") &&
				 !lineItem.name.toUpperCase().includes("CASE") &&
				 !lineItem.name.toUpperCase().includes("PER LB") &&
				 !lineItem.name.toUpperCase().includes("PRIMAL") &&
				 !lineItem.name.toUpperCase().includes("DELIVERY") &&
				 !lineItem.name.toUpperCase().includes("HALF HOG")){

				// Add purchase value to the total
				totalPurchaseValue += (parseFloat(lineItem.totalMoney.amount) / 100.00);

				if(lineItem.name in map){
					map[lineItem.name] = map[lineItem.name]+parseInt(lineItem.quantity);
				}
				else{
					map[lineItem.name] = parseInt(lineItem.quantity);
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
}

async function main() {
	const ordersResultsArray = await searchOrders();

	for(let h = 0; h < ordersResultsArray.length; h++){

		var ordersResult = ordersResultsArray[h];
		if(ordersResult.orders){
			for (let i = 0; i < ordersResult.orders.length; i++){
				var order = ordersResult.orders[i];
				addLineItemsToMap(order);
			}
		}
	}

	finishUp();
}

function finishUp(){
	console.log(sortObjectByKeys(map));
	console.log("\n");
	console.log("TOTAL VALUE: $" + totalPurchaseValue.toFixed(2));
	console.log("\n");
}

function sortObjectByKeys(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

main();


