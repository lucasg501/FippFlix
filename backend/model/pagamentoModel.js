const Database = require('../utils/database')

const banco = new Database();

class pagamentoModel {

    #pagId;
    #pagData;
    #usuarioId;
    #planoId;

    get pagId() { return this.#pagId; } set pagId(pagId) { this.#pagId = pagId }
    get pagData() { return this.#pagData; } set pagData(pagData) { this.#pagData = pagData }
    get usuarioId() { return this.#usuarioId; } set usuarioId(usuarioId) { this.#usuarioId = usuarioId }
    get planoId() { return this.#planoId; } set planoId(planoId) { this.#planoId = planoId }

    constructor(pagId, pagData, usuarioId, planoId) {
        this.#pagId = pagId;
        this.#pagData = pagData;
        this.#usuarioId = usuarioId;
        this.#planoId = planoId;
    }

    toJSON() {
        return {
            'pagId': this.#pagId,
            'pagData': this.#pagData,
            'usuarioId': this.#usuarioId,
            'planoId': this.#planoId
        }
    }


    async gravar(bd) {
        if (bd == null)
            bd = banco;
        let sql = 'insert into tb_pagamento (pag_data, usu_id, pla_id) values (now(),?,?)';
        let valores = [this.#usuarioId.usuId, this.#planoId.planoId];

        let result = await bd.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async listar(){
        let sql = 'select * from tb_pagamento';
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i=0; i<rows.length; i++){
            lista.push(new pagamentoModel(rows[i]['pag_id'], rows[i]['pag_data'], rows[i]['usu_id'], rows[i]['pla_id']));
        }
        return lista;
    }

    async pagar(pagId){
        let sql = 'insert into tb_pagamento (pag_data, usu_id, pla_id) values (now(),?,?)';
        let valores = [this.#pagData, this.#usuarioId, this.#planoId];
    }
}

module.exports = pagamentoModel;