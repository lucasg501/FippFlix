const UsuarioModel = require("../model/usuarioModel");


class LoginController {

    async autenticar(req, res) {
        if(req.body.usuEmail != undefined && req.body.usuSenha != undefined) {
            let usuario = new UsuarioModel();
            usuario = await usuario.autenticar(req.body.usuEmail, req.body.usuSenha)

            if(usuario != null) {
                res.cookie('cookieAuth', 'FIPPFLIX501');
                res.status(200).json({msg: 'Usuário autenticado!', usuario: usuario.toJSON()});
            }
            else{
                res.status('404').json({msg: 'Usuário não encontrado'})
            }
        }
        else{
            res.status('400').json({msg: 'Requisição inválida'});
        }
    }

    async logout(req, res) {
        res.clearCookie("cookieAuth");

        res.status(200).json({msg: "Usuário deslogado!"});
    } 
}

module.exports = LoginController;