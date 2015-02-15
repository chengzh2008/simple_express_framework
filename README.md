
# my first simple home-made Express framework for nodeJs.

A simple restful API framework for nodeJs.

# Usage:

install: npm install -g simple_express_framework

Then in your code:

var myExpress = require('./index');

myExpress.addResources('unicorns');
myExpress.addResources('footballs');

myExpress.startServer(4000);


# You can add many resources as you want. The resourses are stored in the server folder '/data/'.
And it support GET/POST/PUT/PATCH/DELETE http request.

