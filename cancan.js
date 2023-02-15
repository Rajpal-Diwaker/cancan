    let app = require('express')(),
        express = require('express'),
        server = require('http').Server(app),
        bodyParser = require('body-parser'),
        path = require('path');

        require('./Utilities/dbConfig');

    let userRoute = require('./Routes/user'),
        adminRoute = require('./Routes/userAdmin'),
        productRoute = require('./Routes/product'),
        util = require('./Utilities/util'),
        config = require("./Utilities/config").config;
    app.use("/media", express.static(path.join(__dirname, '/public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/views'));
    app.set('view engine', 'ejs');
    app.use(function(err, req, res, next) {
        return res.send({ "errorCode": util.statusCode.FOUR_ZERO_ZERO, "errorMessage": util.statusMessage.SOMETHING_WENT_WRONG });
    });
    app.use(function (req, res, next) {
        // res.header("Access-Control-Allow-Origin", "localhost:4200");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next()
    });
    // app.use("/cancan", express.static(path.join(__dirname, 'dist/cancan') ));
    // app.get('/', (req, res) => {
    // 	res.sendFile(path.join(__dirname, 'dist/cancan'));
    // })


    app.use("/cancan", express.static(path.join(__dirname, 'dist/cancan')));
app.get('/cancan/*', (req, res) => {
    res.sendFile(`${__dirname}/dist/cancan/index.html`);
})

    //app.use('/', webRoute);
    app.use('/user', userRoute);
    app.use('/admin', adminRoute);
    app.use('/product', productRoute);
    server.listen(config.NODE_SERVER_PORT.port,function(){
    	console.log('Server running on port '+ config.NODE_SERVER_PORT.port);
    });
