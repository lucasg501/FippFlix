const express = require ('express');
const PlanoController = require ('../controller/planoController');
const Autorizacao = require('../middlewares/autorizacao');

const router = express.Router();

let auth = new Autorizacao();
let ctrl = new PlanoController();

router.get('/listar', auth.validarToken, (req,res) => {
    ctrl.listar(req,res);
});

router.post('/criar', auth.validarToken, (req,res) => {
    ctrl.gravar(req,res);
});

router.put('/alterar', auth.validarToken, (req,res) => {
    ctrl.alterar(req,res);
});

router.delete('/excluir', auth.validarToken, (req,res) => {
    ctrl.excluir(req,res);
});

module.exports = router;