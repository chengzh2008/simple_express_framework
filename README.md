# My Own Express Framework


Hello there! This is my **my express framework**, made from the pure vanilla node.

## Usage

**Installation**:
`npm install -g simple_express_framework`

**Then in your code**: Just as simple as three lines of code, a RESTFUL web server is good to go.

	var myExpress = require('simple_express_framework');
	myExpress.addResources('unicorns');
	myExpress.addResources('footballs'); // you can add whatever resource you need
	myExpress.startServer(4000); // take port number that you want
	
	// json data is stored at server root directory /data/<your resource>/id.json
	

## Test the server
You can use superagent-cli or any other http request utility to test the server.

`superagent <url> <rest method(get|post|put|patch|delete)> <json data>`

## Http request/response format 

It supports http request `<get|post|put|patch|delete>`. 

For put, post and patch, the Json data is sent along with the request, saved or modified json data sent back as a data property in a json object as response body if success. Other wise, error message will be included in the return response.body and data property is set to `null`. 

	//json data in the request:
	{ 	key1: value1,
		key2: value2,
		key3: value3
	}
	
	// json data in the response:
	{	msg: "Successful|Invalid request|Internal server error"
		data: 	// or modified data with patch request
			{	key1: value1,  
				key2: value2,
				key3: value3
			}
	}
							
For get and delete, no data is sent along the request, the response data contains indicating the request/response status and json data for get request and null for delete request.

	//no json data in the request:
	
	// json data in the response:
	{	msg: "Successful|Invalid request|Internal server error"
		data: 	// for "get" request and "null" for delete request
			{	key1: value1,  
				key2: value2,
				key3: value3
			}
	}


## Internal components (for reference only)
There are four modules in my express framework: 
	
	index.js			// The package main js file
	httpServer.js 	// Server related configuration and creation
	Router.js			// Handle resources based on the request method
	dataSourcePlain	// Deal with the json data store, currentlly support flat file store, can be easily swapped out to use mongodb database.


## Credits
Give credits to instructors and members in CodeFellow Fullstack Javascript for those helpful discussion and suggestion.



