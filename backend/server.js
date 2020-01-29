// const _=require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var {
    mongoose
} = require('./mongoose');
var {
    User
} = require('./models/user');


var app = express();
app.use(cors());


app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({
    extended: true
}));
//  app.use(function (req, res, next) {
//     // res.header('Access-Control-Allow-Origin', '*');
//     //  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     //  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     // next();
//   });
// app.all("/*", function(req, res, next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     next();
//   });

app.post('/login', (req, res) => {
    try {
        const data = req.body;
        const query = {
            $or: [{
                    userName: data.userNameOrEmail
                },
                {
                    userEmail: data.userNameOrEmail
                }
            ]

        }
        User.findOne(query, (err, user) => {
            if (!err && user) {
                if (user.password !== data.password) {
                    return res.send({
                        error: true,
                        description: "Password is incorrect"
                    })
                } else {
                    return res.send({
                        error: null,
                        description: "Successfully loged In!"
                    })
                }
            } else if (!err && !user) {
                return res.send({
                    error: true,
                    description: "Email id or user name is incorrect"
                })
            } else {
                return res.status(400).send({
                    error: true,
                    description: err
                });
            }
        })
    } catch (error) {
        console.log('error in /login', error);

    }

});

app.post('/createUser', (req, res) => {

    try {
        const data = req.body;
        const query = {
            $or: [{
                    userName: data.userName
                },
                {
                    userEmail: data.userEmail
                }
            ]

        }
        User.findOne(query, (err, user) => {
            if (!err && user) {
                return res.send({
                    error: null,
                    description: "User already exist"
                })
            } else if (!err && !user) {
                const user = new User(data);
                user.save().then((doc) => {
                    return res.send({
                        error: null,
                        description: "User added"
                    });
                }, (e) => {
                    return res.status(400).send(e);
                });
            } else {
                return res.status(400).send(err);
            }
        })
    } catch (error) {
        console.log('error in /createUser', error);

    }

});

app.post('/forgotpassword', (req, res) => {

    try {
        const data = req.body;
        const query = {
            $or: [{
                    userName: data.userName
                },
                {
                    userEmail: data.userEmail
                }
            ]

        }
        User.findOne(query, (err, user) => {
            if (!err && user) {
                return res.send({
                    error: null,
                    description: "user already exist"
                })
            } else if (!err && !user) {
                return res.send({
                    error: true,
                    description: "user does not exist"
                })
            } else {
                return res.status(400).send(err);
            }
        })
    } catch (error) {
        console.log('error in /forgotpassword', error);

    }

})

app.post('/updatepassword', (req, res) => {
    try {
        const data = req.body;
        const query = {
            $or: [{
                    userName: data.userNameOrEmail
                },
                {
                    userEmail: data.userNameOrEmail
                }
            ]

        }
        User.findOne(query, (err, user) => {
            if (!err && user) {
                user.set({
                    password: data.password
                });
                return res.send({
                    error: null,
                    description: "password changed"
                })
            } else {
                return res.status(400).send(err);
            }
        })
    } catch (error) {
        console.log('error in /updatepassword', error);

    }

})


app.listen(3000, () => {
    console.log("Server is up on 3000");

});