const { error } = require('console');
const Database = require ('../utils/database')

const banco = new Database();

class usuListaModel{

    #usuListaId;
    #usuarioId;
    #conteudoId;


    get usuListaId(){ return this.#usuListaId;} set usuListaId(usuListaId){this.#usuListaId = usuListaId;}
    get usuarioId(){ return this.#usuarioId;} set usuarioId(usuarioId){this.#usuarioId = usuarioId;}
    get conteudoId(){ return this.#conteudoId;} set conteudoId(conteudoId){this.#conteudoId = conteudoId;}

    constructor(usuListaId, usuarioId, conteudoId){
        this.#usuListaId = usuListaId;
        this.#usuarioId = usuarioId;
        this.#conteudoId = conteudoId;
    }

    toJSON(){
        return{
            'usuListaId' : this.#usuListaId,
            'usuarioId' : this.#usuarioId,
            'conteudoId' : this.#conteudoId,
        }
    }

    async gravar(){
        let sql = 'insert into tb_usuariolista (usu_id, con_id) values (?,?)';
        let valores = [this.#usuarioId, this.#conteudoId];
        let ok = await banco.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }

    

    async excluir(usuListaId){
        let sql = 'delete from tb_usuariolista';
        let valores = [usuListaId];
        let ok = await banco.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }
}

module.exports = usuListaModel;