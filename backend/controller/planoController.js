const PlanoModel = require ('../model/planoModel');

class PlanoController{
    criar (req, res){
        if(Object.keys(req.body).length == 3){
            const planoModel = new PlanoModel();

            planoModel.planoId = 0;
            planoModel.planoNome = req.body.planoNome;
            planoModel.planoDescricao = req.body.planoDescricao;
            planoModel.planoValor = req.body.planoValor;
            let ok = planoModel.gravar();

            if(ok)
                res.status(200).json({msg: "Plano adicionado!"})
            else
                res.status(500).json({msg: "Erro ao gravar plano"})
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"}) 
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length == 4){
            const planoModel = new PlanoModel();

            planoModel.planoId = req.body.planoId;
            planoModel.planoNome = req.body.planoNome;
            planoModel.planoDescricao = req.body.planoDescricao;
            planoModel.planoValor = req.body.planoValor;
            let ok = planoModel.gravar();

            if(ok)
                res.status(200).json({msg: "Plano adicionado!"})
            else
                res.status(500).json({msg: "Erro ao gravar plano"})
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"}) 
        }
    }

    async listar(req,res){
        const planoModel =  new PlanoModel();
        let lista = await planoModel.listar();
        let listaRetorno = [];

        for(let i=0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async excluir(req,res){
        try{
            if(req.params.planoId != null){
                const planoModel = new PlanoModel();
                let ok = await planoModel.excluir(req.params.planoId);
                
                if(ok) {
                    res.status(200).json({msg: "Plano excluído com sucesso!"})
                }else{
                    res.status(500).json({msg: "Plano ao excluir usuário"});
                }
            }else{
                res.status(400).json({msg: 'Parâmetro inválido'})
            }
        }catch{
            res.status(500).json({msg: e.message})
        }
    }
}

module.exports = PlanoController;