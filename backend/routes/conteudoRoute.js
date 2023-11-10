const express = require ('express');
const ConteudoController = require ('../controller/conteudoController');
const Autorizacao = require('../middlewares/autorizacao');

const router = express.Router();

let auth = new Autorizacao();
let ctrl = new ConteudoController();

router.get('/obter/:conId', auth.validarToken, (req,res) =>{
    // #swagger.tags = ['Conteudo']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }]*/
    ctrl.obter(req,res);
})

router.get('/listar', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Conteudo']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }]*/
    ctrl.listar(req,res);
});

router.post('/criar', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Conteudo']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conteudo"
                    }  
                }
            }
        } 
    */
    ctrl.criar(req,res);
});

router.put('/alterar', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Conteudo']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conteudo"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req,res);
});

router.delete('/excluir/:conId', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Conteudo']
    /* #swagger.security = [{
        "apiKeyAuth": ['FIPPFLIX501]
    }]*/
    // #swagger.parameters['codigo'] = {description: 'Codigo do conteudo a ser excluido'}
    ctrl.excluir(req,res);
});

module.exports = router;