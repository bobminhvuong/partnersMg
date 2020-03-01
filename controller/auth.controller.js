var config = require('./../config');
const con = require('./../db');
var jwt = require('./../utils/jwt');
var crypto = require('./../utils/crypto');


module.exports = {
    login: login,
    getCurrentUser: getCurrentUser
}
function login(req, res) {
    let userLogin = req.body;
    con.query(
        'SELECT * FROM users u WHERE (u.email = ? OR u.phone = ?)',
        [userLogin.username, userLogin.username],
        function (err, response) {
            if (err) {
                return res.send(err);
            } else {
                if (response.length == 0) {
                    res.send({
                        message: "Số điện thoại hoặc địa chỉ email không hợp lệ!",
                        status: 0
                    });
                } else {
                    let user = response[0];
                    let pass = crypto.hashWithSalt(userLogin.password, user.salt);
                    if (user.password == pass) {
                        delete user.salt;
                        delete user.password;
                        jwt.sign(JSON.stringify(user), function (err, token) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.send({
                                    token: token,
                                    status: 1,
                                    message: 'Đăng nhập thành công'
                                })
                            }
                        })
                    } else {
                        res.send({
                            message: "Mật khẩu không khớp!",
                            status: 0
                        });
                    }
                }
            }
        })
}

function getCurrentUser(req, res) {
    let token = req.headers[config.TOKEN];
    jwt.verify(token, function (err, decodeData) {
        if (token && decodeData) {
            con.query('SELECT * FROM users WHERE email="' + decodeData.email + '"', function (err, response) {
                if (err) {
                    return res.send(err);
                } else {
                    let us = response[0];
                    delete us.salt;
                    delete us.password;

                    con.query(`SELECT gr.name , gr.role FROM user_roles ur 
                                JOIN group_roles as gr ON ur.group_role_id = gr.id WHERE 
                                gr.active = 1 AND ur.active = 1 AND ur.user_id= ${us.id}`,
                        (err, role) => {
                            if (err) return res.send(err);
                            us.roles = role;
                            return res.send({
                                status: 1,
                                message: 'ok',
                                data: us
                            });
                        });
                }
            });
        } else {
            return res.status(401).json({
                status: 0,
                message: 'Không được phép đăng nhập!'
            });
        }
    })
}
