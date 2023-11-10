const CategoriaModel = require('./model/categoriaModel');
const ConteudoModel = require('./model/conteudoModel')
const PerfilModel = require('./model/perfilModel')
const PlanoModel = require('./model/planoModel')
const UsuarioModel = require('./model/usuarioModel')
const ListaUsuModel = require('./model/usuListaModel')

const swaggerAutogen = require("swagger-autogen")({openapi: "3.0.0"});

const doc = {
    info: {
        title: "FIPPFLIX ",
        description: "API do trabalho de PFS2"
    },
    host: "localhost:4000",
    securityDefinitions:{
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'chaveapi',
            description: 'Chave de autorização da API'
        },
    },
    components: {
        schemas: {
            usuario: new UsuarioModel(501, 'teste@teste.com', '123', 'Teste da silva', '', 1).toJSON(),
            categoria: new CategoriaModel(501, 'Jogos'),
            conteudo: new ConteudoModel(501, '7G4RYtP5RQQ&ab_channel=BalenaProductions', 'Godzilla dançando', 'S', 501),
            perfil: new PerfilModel(501, 'teste'),
            listaUss: new ListaUsuModel(501, 501, 501)
        }
    }
};

let outputJson = './outputSwagger.json';
let endpoints = ['./server.js']

swaggerAutogen(outputJson,endpoints, doc)
.then(r=>{
    require('./server.js')
});