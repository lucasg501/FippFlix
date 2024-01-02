const express = require ('express');
const UsuListaController = require ('../controller/usuListaController');
const Autorizacao = require('../middlewares/autorizacao');

const router = express.Router();

let auth = new Autorizacao();
let ctrl = new UsuListaController();

router.get('/listar/:usuId', auth.validarToken, (req,res) => {
    // #swagger.tags = ['UsuLista']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }]*/
    ctrl.listar(req,res);
});

router.post('/criar', auth.validarToken, (req,res) => {
    // #swagger.tags = ['UsuLista']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/usuLista"
                    }  
                }
            }
        } 
    */
    ctrl.gravar(req,res);
});

router.put('/alterar', auth.validarToken, (req,res) => {
    ctrl.alterar(req,res);
});

router.delete('/excluir', auth.validarToken, (req,res) => {
    // #swagger.tags = ['UsuLista']
    /* #swagger.security = [{
        "apiKeyAuth": ['FIPPFLIX501]
    }]*/
    // #swagger.parameters['codigo'] = {description: 'Codigo do favorito a ser excluido'}
    ctrl.excluir(req,res);
});

module.exports = router;