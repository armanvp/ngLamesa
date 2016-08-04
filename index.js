var port = 2000;
var express = require('express');
var app = express();

// Set document root
app.use(express.static(__dirname + '/public'));

// Test end points
app.get('/api/users', function(req, res) {

  var users = [
    { firstName: 'Arman', lastName: 'Pagilagan', age: '30' },
    { firstName: 'John', lastName: 'Doe', age: '25' },
    { firstName: 'Juan', lastName: 'Dela Cruz', age: '35' },
    { firstName: 'Marko', lastName: 'Pollo', age: '40' },
  ]

  res.json(users);

});

// Listen to the specified Port
app.listen(port, function(){ console.log('Listening at port '+port) });
