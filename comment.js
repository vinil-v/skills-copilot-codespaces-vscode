// Create web server
// 1. Create web server
// 2. Create router
// 3. Create handler
// 4. Register handler to router
// 5. Start web server
// 6. Test

var http = require('http');
var comment = require('./comment');
var router = require('./router');
var handler = require('./handler');

var server = http.createServer();
var port = 3000;

router.register('/', handler.index);
router.register('/create', handler.create);
router.register('/update', handler.update);
router.register('/delete', handler.delete);

server.on('request', function(req, res) {
  router.route(req, res);
});

server.listen(port, function() {
  console.log('Server is running on port', port);
});