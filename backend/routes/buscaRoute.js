const express = require ('express');
const buscaController = require('../controller/buscaController');
const Autorizacao = require('../middlewares/autorizacao');



const router = express.Router();

let auth = new Autorizacao();
let ctrl = new buscaController();


router.get('/listar/:buscaDescricao', auth.validarToken, (req,res) => {
    // #swagger.tags = ['BuscaLista']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }]*/
    ctrl.buscaListar(req,res);
});

module.exports = router;
