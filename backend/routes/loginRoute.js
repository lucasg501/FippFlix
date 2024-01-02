const express = require('express');
const LoginController = require('../controller/loginController');


const router = express.Router();
let ctrl = new LoginController();

router.get('/logout', (req, res) => {
    //#swagger.tags = ['Login']

    ctrl.logout(req, res);
})

router.post('/autenticar', ctrl.autenticar);

module.exports = router;