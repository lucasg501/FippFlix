const conteudoModel = require('../model/conteudoModel');
const ConteudoModel = require('../model/conteudoModel');

class ConteudoController{
    criar(req,res){
        if(Object.keys(req.body).length == 4){
            let conteudoModel = new ConteudoModel();

            conteudoModel.conId = 0;
            conteudoModel.conYtId = req.body.conYtId;
            conteudoModel.conTitulo = req.body.conTitulo;
            conteudoModel.conDisponivel = req.body.conDisponivel;
            conteudoModel.categoriaId = req.body.categoriaId;
            let ok = conteudoModel.gravar();
            if(ok){
                res.status(200).json({msg:"Conteudo adicionado com sucesso"});
            }else{
                res.status(500).json({msg: "Erro ao gravar conteudo"});
            }
        }else{
            res.status(400).json({msg:"Parametros invalidos"});
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length == 5){
            let conteudoModel = new ConteudoModel();

            conteudoModel.conId = req.body.conId;
            conteudoModel.conYtId = req.body.conYtId;
            conteudoModel.conTitulo = req.body.conTitulo;
            conteudoModel.conDisponivel = req.body.conDisponivel;
            conteudoModel.categoriaId = req.body.categoriaId;
            let ok = await conteudoModel.gravar();
            if(ok){
                res.status(200).json({msg:"Conteudo alterado com sucesso"});
            }else{
                res.status(500).json({msg:"Erro ao alterar conteudo"});
            }
        }else{
            res.status(400).json({msg:"Parametros invalidos"});
        }
    }

    async obter(req,res){
        if(req.params.conId != undefined){
            let conteudo = new ConteudoModel();
            conteudo = await conteudo.obter(req.params.conId);
            if(conteudo == null){
                res.status(400).json({msg:"Conteudo não encontrado"});
            }else{
                res.status(200).json(conteudo.toJSON());
            }
        }else{
            res.status(400).json({msg:"Parametro invalido"});
        }
    }

    async listar(req,res){
        let conteudoModel = new ConteudoModel();
        let lista = await conteudoModel.listar();  //define uma variavel que ira receber os dados da função listar da model
        let listaRetorno = []; 

        for(let i=0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON()); //faz o vetor vazio receber os dados enviados pela função listar da model em forma JSON
        }
        res.status(200).json(listaRetorno);
    }

    async excluir(req,res){
        try{
            if(req.params.conId != null){
                let conteudoModel = new ConteudoModel();
                let ok = await conteudoModel.excluir(req.params.conId);
                if(ok){
                    res.status(200).json({msg:"Conteudo excluido com sucesso"});
                }else{
                    res.status(500).json({msg:"Erro ao excluir conteudo"});
                }
            }else{
                res.status(400).json({msg:"Parametros invalidos"});
            }

        }catch(e){
            res.status(500).json({msg: e.message})
        }
    }
}

module.exports = ConteudoController;