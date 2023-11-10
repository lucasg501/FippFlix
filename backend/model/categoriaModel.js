const Database = require ('../utils/database')

const banco = new Database();

class categoriaModel{

    #catId;
    #catDescricao;

    get catId(){return this.#catId;} set catId(catId){this.#catId = catId;}
    get catDescricao(){return this.#catDescricao;} set catDescricao(catDescricao){this.#catDescricao = catDescricao};

    constructor(catId, catDescricao){
        this.#catId = catId;
        this.#catDescricao = catDescricao;
    }

    toJSON(){
        return{
            'catId' : this.#catId,
            'catDescricao' : this.#catDescricao
        }
    }

    async gravar(){
        if(this.#catId == 0){
            let sql = 'insert into tb_categoria (cat_descricao) values (?)';
            let valores = [this.#catDescricao];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);

            return ok;
        }else{
            let sql = 'update tb_categoria set cat_descricao = ? where cat_id = ?';
            let valores = [this.#catDescricao, this.#catId];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }
    }

    async listar(){
        let sql = 'select * from tb_categoria';
        let rows = await banco.ExecutaComando(sql); //cria uma variavel que envia o comando sql para onde os dados sao conversados pelo banco e que vai receber o resultado dessa requisição
        let lista = []; //cria um vetor com o nome de lista

        for(let i=0; i<rows.length; i++){ //esse for percore todas as posiçoes que foram criadas com a variavel que fez interação com o banco
            lista.push(new categoriaModel(rows[i]['cat_id'], rows[i]['cat_descricao'])); // .push = coloca dentro da lista as linhas com a posição e nome indicados dentro dos colchetes
        }
        return lista;
    }

    async obter(catId){
        let sql = 'select * from tb_categoria where cat_id = ?';
        let valores = [catId];

        let rows = await banco.ExecutaComando(sql,valores);

        if(rows.length > 0){
            let categoria = new categoriaModel(rows[0]['cat_id'], rows[0]['cat_descricao']);

            return categoria;
        }

        return null;
    }

    async excluir(catId){
        let sql = 'delete from tb_categoria where cat_id = ?';
        let valores = [catId];
        let ok = await banco.ExecutaComandoNonQuery(sql,valores);
        
        return ok;
    }
}

module.exports = categoriaModel;