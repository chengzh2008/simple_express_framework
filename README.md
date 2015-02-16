
# My first simple home-made Express framework for nodeJs.
================================================================

A simple restful API framework for nodeJs.

# Usage:

install: npm install -g simple_express_framework

Then in your code:

var myExpress = require('./index');

myExpress.addResources('unicorns');

myExpress.addResources('footballs');
// you can add what ever resources you want to handle.

myExpress.startServer(4000);


You can add many resources as you want. The resources are stored in the server folder '/data/'.
And it support GET/POST/PUT/PATCH/DELETE http request.


Credit to chance library.
In my test code, I use the chance library to generate random string for testing.