'usr strict';

var myExpress = require('./index');

myExpress.addResources('unicorns');
myExpress.addResources('footballs');

myExpress.startServer();