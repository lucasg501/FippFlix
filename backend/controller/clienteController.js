const UsuarioModel = require("../model/usuarioModel");


class clienteController{

    gravar(req,res){
        if(Object.keys(req.body).length == 4){
            let usuarioModel = new UsuarioModel();
            
            usuarioModel.usuId = 0;
            usuarioModel.usuEmail = req.body.usuEmail;
            usuarioModel.usuSenha = req.body.usuSenha;
            usuarioModel.usuNome = req.body.usuNome;
            usuarioModel.usuDataCad = req.body.usuDataCad;
            usuarioModel.perfilId = req.body.perfilId;
            

            let ok = usuarioModel.gravarCliente();
            if(ok)
                res.status(200).json({msg: "Usuário adicionado!"})
            else
                res.status(500).json({msg: "Erro ao gravar usuário"})
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

}

module.exports = clienteController;