const CategoriaModel = require('../model/categoriaModel');

class CategoriaController{
    gravar(req, res){
        if(Object.keys(req.body).length == 1){
            let categoriaModel = new CategoriaModel();

            categoriaModel.catId = 0;
            categoriaModel.catDescricao = req.body.catDescricao;
            let ok = categoriaModel.gravar();

            if(ok)
                res.status(200).json({msg: "Categoria adicionada!"})
            else
                res.status(500).json({msg: "Erro ao gravar categoria"})
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"}) 
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length == 2){
            let categoriaModel = new CategoriaModel();

            categoriaModel.catId = req.body.catId;
            categoriaModel.catDescricao = req.body.catDescricao;
            let ok = categoriaModel.gravar();

            if(ok)
                res.status(200).json({msg: "Categoria alterada!"})
            else
                res.status(500).json({msg: "Erro ao gravar categoria"})
        }else{
            res.status(400).json({msg: "Parâmetros inválidos"}) 
        }
    }

    async listar(req,res){
        let categoriaModel = new CategoriaModel();
        let lista = await categoriaModel.listar();
        let listaRetorno = [];
        for(let i=0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async obter(req,res){
        if(req.params.catId != undefined){
            let categoria = new CategoriaModel();
            categoria = await categoria.obter(req.params.catId);
            if(categoria == null){
                res.status(404).json({msg:"Categoria não encontrada"});
            }else{
                res.status(200).json(categoria.toJSON());
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos"});
        }
    }

    async excluir(req,res){
        try{
            if(req.params.catId != null){
                let categoriaModel = new CategoriaModel();
                let ok = await categoriaModel.excluir(req.params.catId);

                if(ok) {
                    res.status(200).json({msg: "Categoria excluída com sucesso!"})
                }
                else{
                    res.status(500).json({msg: "Erro ao excluir categoria"});
                }
            }else{
                res.status(400).json({msg: 'Parâmetro inválido'})
            }

        }catch(e){
            res.status(500).json({msg: e.message})   
        }
    }
}

module.exports = CategoriaController;