const PerfilModel = require ('../model/perfilModel');

class PerfilController{
    gravar(req,res){
        if(Object.keys(req.body).length == 1){
            let perfilModel = new PerfilModel();

            perfilModel.perfilId = 0;
            perfilModel.perfilNome = req.body.perfilNome;
            let ok = perfilModel.gravar();
            if(ok)
                res.status(200).json({msg: "Perfil adicionado!"})
            else
                res.status(500).json({msg: "Erro ao gravar perfil"})
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length == 2){
            let perfilModel = new PerfilModel();

            perfilModel.perfilId == req.body.perfilId;
            perfilModel.perfilNome == req.body.perfilNome;
            let ok = perfilModel.gravar();
            if(ok)
                res.status(200).json({msg: "Perfil alterado!"})
            else
                res.status(500).json({msg: "Erro ao alterar perfil"})
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

    async listar(req,res){
        let perfilModel = new PerfilModel();
        let lista = await perfilModel.listar();
        let listaRetorno = [];

        for(let i=0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async excluir(req,res){
        try{
            if(req.params.perfilId != null){
                let perfilModel = new PerfilModel();
                let ok = await perfilModel.excluir(req.params.perfilId);

                if(ok) {
                    res.status(200).json({msg: "Perfil excluído com sucesso!"})
                }
                else{
                    res.status(500).json({msg: "Erro ao excluir perfil"});
                }
            }else{
                res.status(400).json({msg: 'Parâmetro inválido'})
            }
        }catch{
            res.status(500).json({msg: e.message}) 
        }
    }
}

module.exports = PerfilController;