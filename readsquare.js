import { Client, Environment } from 'square'

const client = new Client({
  environment: Environment.Production,
  accessToken: 'EAAAEBGg1WiL0W_vVcoclENFIWmmcifaSgE-3JgLJS1w7SjMt8HbsPzMPRoYuqh2',
})

const ordersApi = client.ordersApi;

(async function() {
	try {
	  const response = await client.ordersApi.searchOrders({
	    locationIds: [
	      'AB4HBYP24XMZW'
	    ],
	    limit: 10,
	    returnEntries: true
	  });

	  response.result.orderEntries.forEach(function (order) {
	  	console.log(order.orderId);
	  });


	} catch(error) {
	  console.log(error);
	}
}());