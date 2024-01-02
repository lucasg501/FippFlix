const Database = require ('../utils/database')

const banco = new Database();

class planoModel{

    #planoId;
    #planoNome;
    #planoDescricao;
    #planoValor;

    get planoId(){return this.#planoId;} set planoId(planoId){ this.#planoId = planoId;}
    get planoNome(){return this.#planoNome;} set planoNome(planoNome){ this.#planoNome = planoNome;}
    get planoDescricao(){return this.#planoDescricao;} set planoDescricao(planoDescricao){ this.#planoDescricao = planoDescricao;}
    get planoValor(){return this.#planoValor;} set planoValor(planoValor){ this.#planoValor = planoValor;}

    constructor(planoId, planoNome, planoDescricao, planoValor){
        this.#planoId = planoId;
        this.#planoNome = planoNome;
        this.#planoDescricao = planoDescricao;
        this.#planoValor = planoValor;
    }

    toJSON(){
        return{
            'planoId' : this.#planoId,
            'planoNome' : this.#planoNome,
            'planoDescricao' : this.#planoDescricao,
            'planoValor' : this.#planoValor,
        }
    }

    async gravar(){
        let sql = 'insert into tb_plano (pla_nome, pla_descricao, pla_valor) values (?,?,?)';
        let valores = [this.#planoNome, this.#planoDescricao, this.#planoValor];
        let ok = await banco.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }

    async listar(){
        let sql = 'select * from tb_plano';
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i=0; i<rows.length; i++){
            lista.push(new planoModel(rows[i]['pla_id'], rows[i]['pla_nome'], rows[i]['pla_descricao'], rows[i]['pla_valor']));
        }
        return lista;
    }

    async excluir(planoId){
        let sql = 'delete from tb_plano where pla_id = ?';
        let valores = [planoId];
        let ok = await banco.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }

    async obterPlano(planoId){
        let sql = 'select * from tb_plano where pla_id = ?';
        let valores = [planoId];
        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0){
            let row = rows[0];
            let plano = new planoModel(row['pla_id'], row['pla_nome'], row['pla_descricao'], row['pla_valor']);
            return plano;
        }
        return null;
    }
}

module.exports = planoModel;