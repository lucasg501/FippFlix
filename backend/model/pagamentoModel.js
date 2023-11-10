const Database = require ('../utils/database')

const banco = new Database();

class pagamentoModel{

    #pagId;
    #pagData;
    #usuarioId;
    #planoId;

    get pagId(){return this.#pagId;} set pagId(pagId){this.#pagId = pagId}
    get pagData(){return this.#pagData;} set pagData(pagData){this.#pagData = pagData}
    get usuarioId(){return this.#usuarioId;} set usuarioId(usuarioId){this.#usuarioId = usuarioId}
    get planoId(){return this.#planoId;} set planoId(planoId){this.#planoId = planoId}

    constructor(pagId, pagData, usuarioId, planoId){
        this.#pagId = pagId;
        this.#pagData = pagData;
        this.#usuarioId = usuarioId;
        this.#planoId = planoId;
    }

    toJSON(){
        return{
            'pagId' : this.#pagId,
            'pagData' : this.#pagData,
            'usuarioId' : this.#usuarioId,
            'planoId' : this.#planoId
        }
    }
}

module.exports = pagamentoModel;