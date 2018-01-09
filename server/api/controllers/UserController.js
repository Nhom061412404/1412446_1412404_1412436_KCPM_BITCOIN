const User = require('../models/User');
const bcrypt = require('bcrypt');
const utils = require('../utils');
const privateKey  = require('../jwt-key').privateKey;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const MailController = require('./MailController');

exports.createUser = (req, res) => {
    const emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/;

    if (!req.body.email) {
        res.status(400).send({flag: 0, err: 'Email can not be empty.'});
    }
    else if (!emailRegx.test(req.body.email)) {
        res.status(400).send({flag: 0, err: "Email is not correct format."});
    } else {
        bcrypt.hash(req.body.pwd, 10, (err, pwdHash) => {
            var hashToken = utils.generateTimeEmailToken(req.body.email);
            var user = new User({email: req.body.email, pwdHash, address: [utils.generateAddress()]
                , activeHash: hashToken});
            user.save((err) => {
                if (err) { 
                    res.status(400).send({flag: 0, err: err.errmsg});
                } else {
                    if (process.env.NODE_ENV === 'development') {
                        res.send({flag: 1, token: hashToken});
                    } else {
                        MailController.activeAccount(req.body.email, hashToken)
                        .then((results) => {
                            res.status(200).send({flag: 1, msg: "OK"});
                        })
                        .catch((err) => {
                            res.status(400).send({flag: 0, err: err.toString()});
                        });
                    }
                }
            });
        });
    }
}

exports.authenticate = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            res.status(400).send({flag : 0, err: err.errmsg});
        } else {
            if (!user) {
                res.status(400).send({flag: 0, err: "Authentication failed."});
            } else {
                bcrypt.compare(req.body.pwd, user.pwdHash, (err, hash) => {
                    if (err || !hash) {
                        res.status(400).send({flag: 0, err: "Authentication failed."});
                    }
                    else if (hash) {
                        var token = jwt.sign({
                            email: user.email,
                            address: user.address.address,
                            publicKey: user.address.publicKey,
                            privateKey: user.address.privateKey,
                            time: Date.now()
                        }, privateKey);
                        res.send({flag: 1, token});
                    }
                });
            }
        }
    });
}

exports.userinfo = (req, res) => {
    res.send({email: user.email, address: user.address});
}

exports.forgotPassword = (req, res) => {
    const hashToken = utils.generateTimeEmailToken(req.user.email);

    User.findOneAndUpdate({_id: req.user._id}, {forgotHash: hashToken},
        (err) => {
            if (err) return res.status(400).send({flag: 0, err: err.errmsg});

            if (process.env.NODE_ENV === 'development') {
                res.send({flag: 1, token: hashToken});
            } else {
                MailController.forgotPassword(req.user.email, hashToken).then((results) => {
                  res.send({flag: 1, msg: 'OK'});
              }).catch((err) => {
                  res.status(400).send({flag: 0, err});
              });
            }
    });
}


exports.resetPassword = (req, res) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        if (err)
            return res.status(400).send({flag: 0, err});
        if (user.forgotHash !== req.body.token)
            return res.status(400).send({flag: 0, err: 'Wrong token.'});
        else {
            decrypted = utils.decryptTimeEmailToken(req.body.token);
            const infos = decrypted.split('-');
            
            if (Date.now() - parseInt(infos[0]) > 300000) // more than 5 min
                return res.status(400).send({flag: 0, err: 'Request expired.'});
            if (infos[1] !== req.user.email)
                return res.status(400).send({flag: 0, err: 'Bad request.'});

            bcrypt.hash(req.body.newPwd, 10, (err, pwdHash) => {
                if (err)
                    return res.status(400).send({flag: 0, err});
                User.findOneAndUpdate({_id: req.user._id}, {pwdHash: pwdHash, forgotHash: ''}, (err) => {
                    if (err)
                        return res.status(400).send({flag: 0, err});
                    // TODO: expire all connected
                    res.send({flag: 1, msg: "OK"});
                });
            });
        }
    });
}

exports.activeAccount = (req, res) => {
    User.findOne({activeHash: req.body.token}, (err, user) => {
        if (err)
            return res.status(400).send({flag: 0, err});
        if (!user)
            return res.status(400).send({flag: 0, msg: 'User not exist.'});

        user.activeHash = '';
        user.save((err) => {
            if (err)
                return res.status(400).send({flag: 0, err});
            
                res.send({flag: 1, msg: "OK"});
        })
    });
}