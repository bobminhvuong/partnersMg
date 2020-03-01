var crypto = require('./../utils/crypto');
const con = require('./../db');
const { check, validationResult } = require('express-validator');

module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}

function deleteUser(req, res) {
    return res.send();

}

function updateUser(req, res) {
    return res.send();

}

function getAllUser(req, res) {
    let filter = req.filter;
    let find = filter.find && filter.find != '' ?
        `AND (us.fullname like '%${filter.find}%' ) 
                OR us.phone like '%${ filter.find}%'
                OR us.email like '%${ filter.find}%'`
        : '';
    let sql = `SELECT us.id, us.fullname, us.email, us.phone, us.address, us.status , us.created 
                FROM users us WHERE 1 ${ find}
                LIMIT (${filter.offset},${filter.offset})
                `;

    let sqlCount = `SELECT count(us.id) as tt FROM users us WHERE 1 ${find}`;
    con.query(sql, (err, res) => {
        con.query(sqlCount, (err, c) => {
            if (res) return res.send({ status: 1, message: 'oke', data: res, count: c.tt });
            return res.send(err);
        })
    })
}
function createUser(req, res) {
    let user = req.body;
    var salt = crypto.genSalt();
    var request = {
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        salt: salt,
        password: crypto.hashWithSalt(req.body.password, salt),
        created: new Date()
    };
    con.query('SELECT * FROM users u WHERE u.phone =? OR u.email = ?', [request.phone, request.email], (err, r) => {
        if (err) return res.send(err);
        if (r && r.length > 0) {
            return res.send({
                status: 0,
                message: 'Email hoặc số điện thoại đã tồn tại!'
            });
        } else {
            con.query('INSERT INTO users SET ?', request, (err, response) => {
                if (r) {
                    return res.send({
                        status: 1,
                        id: response.insertId,
                        message: 'Đăng kí thành công!'
                    })
                }
            })
        }
    })

}