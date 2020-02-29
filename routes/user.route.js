var router = require('express').Router();
var userController = require('./../controller/user.controller');
// var auth = require('../middle-ware/auth');

module.exports = function () {
    router.get('/', userController.getAllUser);
    router.put('/:id', userController.updateUser);
    router.delete('/:id', userController.deleteUser);
    router.post('/add', userController.createUser);
    return router;
}