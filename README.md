# eddie
Various efficiency scripts for the farm

Generate Picklist (generatepicklist.js)

Square -> Integromat -> Google Sheets -> CSV collation of order picklist

Integromat imports orders from Square and saves them in a Google sheet that is ultimately imported into OnFleet to generate our itineraries. For the purposes of collecting orders, we save a copy of that Google sheet, remove all columns except for the orders, save the file as a CSV, and then use it as input for generatepicklist.js, which will take those individual orders and aggregate the items so the inventory manager will know how many units of each product they need.

The program is simple and brittle right now, expecting /Users/chrisnewman/desktop/orders.txt as the input file.

To run: > node generatepicklist.js

--------

Real Time Picklist

Grabs currently open orders from Square starting at the given date, then returns the picklist and the total sale value of everything in the picklist.
