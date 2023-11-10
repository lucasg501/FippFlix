const express = require ('express');
const CategoriaController = require ('../controller/categoriaController');
const Autorizacao = require('../middlewares/autorizacao');

const router = express.Router();

let auth = new Autorizacao();
let ctrl = new CategoriaController();

router.get('/listar', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Categoria']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }]*/
    ctrl.listar(req,res);
});

router.get('/obter/:catId', auth.validarToken, (req,res) => {
      // #swagger.tags = ['Categoria']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }]*/

    ctrl.obter(req,res);
})

router.post('/criar', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Categoria']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/categoria"
                    }  
                }
            }
        } 
    */
    ctrl.gravar(req,res);
});

router.put('/alterar', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Categoria']
    /* #swagger.security = [{
            "apiKeyAuth": ['FIPPFLIX501']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/categoria"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req,res);
});

router.delete('/excluir/:catId', auth.validarToken, (req,res) => {
    // #swagger.tags = ['Categoria']
    /* #swagger.security = [{
        "apiKeyAuth": ['FIPPFLIX501]
    }]*/
    // #swagger.parameters['codigo'] = {description: 'Codigo da categoria a ser excluida'}
    ctrl.excluir(req,res);
});

module.exports = router;