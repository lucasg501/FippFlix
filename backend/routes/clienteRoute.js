const express = require ('express');
const clienteController = require('../controller/clienteController');

const router =  express.Router();

let ctrl =  new clienteController();

router.post('/criar', ctrl.gravar);

module.exports = router;