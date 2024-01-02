const express = require ('express');
const PagamentoController = require ('../controller/pagamentoController');
const Autorizacao = require ('../middlewares/autorizacao');

const router = express.Router();

let ctrl = new PagamentoController();


router.post('/checkout/', (req,res) =>{
    // #swagger.tags = ['Pagamento']
    ctrl.checkout(req,res);
})

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Pagamento']
    ctrl.listar(req,res);
})

router.post('/pagar/:planoId/:usuarioId', (req,res) =>{
    // #swagger.tags = ['Pagamento']
    //# swagger.parameters['planoId'] 
    //# swagger.parameters['usuarioId']
    
    ctrl.pagar(req,res);
})

module.exports = router;