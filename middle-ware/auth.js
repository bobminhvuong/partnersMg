var jwt = require('./../utils/jwt');
var auth = require('../service/auth.service');
var config = require('./../config')
exports.auth = function () {
    return function (req, res, next) {
        var token = req.headers[config.TOKEN];
        if (token) {
            jwt.verify(token, function (err, decodedData) {
                if (err) {
                    res.status(401).json({
                        status: 0,
                        message: 'Token đã hết hạn!'
                    })
                } else {
                    var email = decodedData.email;
                    auth.getUserByEmail(email).then(function (response) {
                        req.user = response;
                        next();
                    }).catch(function (err) {
                        res.status(401).json(err)
                    });
                }
            });
        } else {
            res.status(401).json({
                status: 0,
                message: 'Không có phiên đăng nhập!'
            })
        }
    }
}