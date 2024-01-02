const conteudoModel = require("../model/conteudoModel");



class buscaController{

    async buscaListar(req,res){
        if (req.params.buscaDescricao != null) {
            let buscaLista = new conteudoModel();
            let lista = await buscaLista.listarBusca(req.params.buscaDescricao);
            let listaRetorno = [];
    
            for(let i=0; i<lista.length; i++){
                listaRetorno.push(lista[i].toJSON()); 
            }
    
            res.status(200).json({ lista: listaRetorno });
        } else {
            res.status(400).json({ msg: "Parâmetros inválidos" });
        }
    }

}

module.exports = buscaController;