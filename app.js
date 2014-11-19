/**
 * Module dependencies.
 */
 /*
In package.json
    "ejs": "*",
    "reload": "JediMindtrick/reload"

In shell
supervisor -e 'html|js' node app.js
or just
npm start
*/
var express = require('express'),
http = require('http'),
path = require('path'),
reload = require('reload');

app = express();

// all environments
app.set('port', process.env.PORT || 7070);
app.set('views', path.join(__dirname, 'DemoAngularJS/SPA'));
app.use(express.favicon());
app.use(express.json(false));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'DemoAngularJS')));
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    app.set('views', path.join(__dirname, 'DemoAngularJS/SPA/LOBApp'));

    res.render('lob.html');
});

app.get('/tic-tac-toe', function(req, res) {
    app.set('views', path.join(__dirname, 'DemoAngularJS/SPA/TicTacToe'));

    res.render('app.html');
});

server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

reload.all(server,app);
