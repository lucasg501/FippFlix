const Database = require ('../utils/database')

const banco = new Database();

class perfilModel{

    #perfilId;
    #perfilNome;

    get perfilId(){return this.#perfilId;} set perfilId(perfilId){this.#perfilId = perfilId;}
    get perfilNome(){return this.#perfilNome;} set perfilNome(perfilNome){this.#perfilNome = perfilNome;}

    constructor(perfilId, perfilNome){
        this.#perfilId = perfilId;
        this.#perfilNome = perfilNome;
    }

    toJSON(){
        return{
            'perfilId' : this.#perfilId,
            'perfilNome' : this.#perfilNome
        }
    }

    async gravar(){
        if(perfilId == 0){
            let sql = 'insert into tb_perfil (per_nome) values (?)';
            let valores = [this.#perfilNome];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }else{
            let sql = 'update from tb_perfil per_nome = ? where per_id = ?';
            let valores = [this.#perfilNome, this.#perfilNome];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

    async listar(){
        let sql = 'select * from tb_perfil';
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i=0; i<rows.length; i++){
            lista.push(new perfilModel(rows[i]['per_id'], rows[i]['per_nome']));
        }
        return lista;
    }

    async excluir(perfilId){
        let sql = 'delete from tb_perfil where per_id = ?';
        let valores = [perfilId];
        let ok = await ExecutaComandoNonQuery(sql, valores);
        return ok;
    }
}

module.exports = perfilModel;