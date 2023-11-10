const express = require ('express');
const UsuarioController = require ('../controller/usuarioController');
const Autorizacao = require('../middlewares/autorizacao');

const router = express.Router();

let auth = new Autorizacao();
let ctrl = new UsuarioController();

router.get('/listar', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Usuario']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }]*/
    ctrl.listar(req,res);
});

router.post('/criar', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Usuario']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/usuario"
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
    // #swagger.tags = ['Usuario']
    /* #swagger.security = [{
        "apiKeyAuth": ['FIPPFLIX501]
    }]*/
    // #swagger.parameters['codigo'] = {description: 'Codigo do usuario a ser excluido'}
    ctrl.excluir(req,res);
});

module.exports = router;