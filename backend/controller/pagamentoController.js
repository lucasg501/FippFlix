const pagamentoModel = require('../model/pagamentoModel');
const PagamentoModel = require ('../model/pagamentoModel')
const stripe = require('stripe')('sk_test_51ODaz8LldWwT3R5qEI9lsQlTpOcRs6vw30qFBsWTp8l5fn2VfWEuQP7igtv7E2f7m1yZZ0qwoRaiXes7suR8s2oR007aLX8IBn');
const Database = require ('../utils/database');
const PlanoModel = require('../model/planoModel');
const UsuarioModel = require('../model/usuarioModel');

class PagamentoController {
    async checkout(req, res) {
        if(req.body.planoValor != "" && req.body.usuId != 0 && req.body.planoId != 0 && req.body.planoNome != ""){

            var plano;

            if(req.body.planoId == 1){
                plano = "Standard";
            }else{
                plano = "Premium";
            }
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'brl',
                            product_data: {
                                name: `Plano: ${plano}`,
                            },
                            unit_amount: parseInt(req.body.planoValor.replace(".","")),
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `http://localhost:3000/plano/pagamento-sucesso/${req.body.planoId}/${req.body.usuId}`,
                cancel_url: 'http://localhost:3000/plano/pagamento-falha',
            });
            res.json({url: session.url})
            }else{
                res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

    async pagamentoFalhou(){
        console.log("Pagamento falhou");
    }

    async pagar(req,res){
        let banco = new Database();

        try{
            await banco.IniciarTransacao();

            if(req.params.planoId != null && req.params.usuarioId != null){
                let plano = new PlanoModel();
                plano = await plano.obterPlano(req.params.planoId);

                let usuario = new UsuarioModel();
                usuario = await usuario.obter(req.params.usuarioId);

                let pagamento = new PagamentoModel(0,0,usuario, plano);

                await pagamento.gravar(banco);
                await banco.Commit();
                res.status(200).json({msg: "Pagamento efetuado com sucesso"});
            }else{
                res.status(400).json({msg: "Parâmetros inválidos"});
            }
        }catch(error){
            await banco.Rollback();
            console.log(error);
            res.status(500).json({msg: 'Erro interno do servidor'});
        }
    }

    async listar(req,res){
        let pagamento = new PagamentoModel();
        let lista = await pagamento.listar();
        let listaRetorno = [];
        for(let i=0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

}

module.exports = PagamentoController;