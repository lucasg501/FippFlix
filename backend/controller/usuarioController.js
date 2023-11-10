const UsuarioModel = require ('../model/usuarioModel');

class UsuarioController{
    gravar(req,res){
        if(Object.keys(req.body).length == 5){
            let usuarioModel = new UsuarioModel();
            
            usuarioModel.usuId = 0;
            usuarioModel.usuEmail = req.body.usuEmail;
            usuarioModel.usuSenha = req.body.usuSenha;
            usuarioModel.usuNome = req.body.usuNome;
            usuarioModel.usuDataCad = req.body.usuDataCad;
            usuarioModel.perfilId = req.body.perfilId;

            let ok = usuarioModel.gravar();
            if(ok)
                res.status(200).json({msg: "Usuário adicionado!"})
            else
                res.status(500).json({msg: "Erro ao gravar usuário"})
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length == 6){
            let usuarioModel = new UsuarioModel();
            
            usuarioModel.usuId = req.body.usuId;
            usuarioModel.usuEmail = req.body.usuEmail;
            usuarioModel.usuSenha = req.body.usuSenha;
            usuarioModel.usuNome = req.body.usuNome;
            usuarioModel.usuDataCad = req.body.usuDataCad;
            usuarioModel.perfilId = req.body.perfilId;

            let ok = usuarioModel.gravar();
            if(ok)
                res.status(200).json({msg: "Usuário alterado!"})
            else
                res.status(500).json({msg: "Erro ao alterar usuário"})
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

    async listar(req,res){
        let usuarioModel = new UsuarioModel();
        let lista = await usuarioModel.listar();
        let listaRetorno = [];
        for(let i=0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async excluir(req,res){
            try{
                if(req.params.usuId != null){
                    let usuarioModel = new UsuarioModel();
                    let ok = await usuarioModel.excluir(req.params.usuId);
                    if(ok) {
                        res.status(200).json({msg: "Usuário excluído com sucesso!"})
                    }else{
                        res.status(500).json({msg: "Erro ao excluir usuário"});
                    }
                }else{
                    res.status(400).json({msg: 'Parâmetro inválido'});
                }
            }catch(e){
                res.status(500).json({msg: e.message});
            }
    }
}

module.exports = UsuarioController;