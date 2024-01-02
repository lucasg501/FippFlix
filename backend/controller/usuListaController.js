const conteudoModel = require('../model/conteudoModel');
const UsuListaModel = require('../model/usuListaModel');

class usuListaController{
    gravar(req,res){
        if(Object.keys(req.body).length == 2){
            let usuListaModel = new UsuListaModel();

            usuListaModel.usuListaId = 0;
            usuListaModel.usuarioId = req.body.usuarioId;
            usuListaModel.conteudoId = req.body.conteudoId;
            let ok = usuListaModel.gravar();

            if(ok)
                res.status(200).json({msg: "Favorito adicionado!"});
            else
                res.status(500).json({msg: "Erro ao gravar favorito"});
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"});
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length == 3){
            let usuListaModel = new UsuListaModel();

            usuListaModel.usuListaId = req.body.usuListaId;
            usuListaModel.usuarioId = req.body.usuarioId;
            usuListaModel.conteudoId = req.body.conteudoId;
            let ok = usuListaModel.gravar();

            if(ok)
                res.status(200).json({msg: "Favorito alterado!"});
            else
                res.status(500).json({msg: "Erro ao alterar favorito"});
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"});
        }
    }


    async listar(req, res) {
        if (req.params.usuId != null) {
            let conteudo = new conteudoModel();
            let lista = await conteudo.listarFavoritos(req.params.usuId);
            let listaRetorno = [];
    
            lista.forEach(function (value, index) {
                if (value instanceof conteudoModel) {
                    listaRetorno.push(value.toJSON());
                } else {
                    listaRetorno.push(value);
                }
            })
    
            res.status(200).json({ lista: listaRetorno });
        } else {
            res.status(400).json({ msg: "Parâmetros inválidos" });
        }
    }

    async excluir(req,res){
        try{
            if(req.params.usuListaId != undefined){
                let usuListaModel = new UsuListaModel();
                let ok = usuListaModel.excluir(req.params.usuListaId);
                return ok;

                if(ok){
                    res.status(200).json({msg: "Favorito excluido"});
                }else{
                    res.status(500).json({msg: "Erro ao excluir favorito"});
                }
            }else{
                res.status(400).json({msg: "Parâmetros inválidos"});
            }
        }catch{

        }
    }

}

module.exports = usuListaController;