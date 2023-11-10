const express = require('express');
const categoriaRota = require('./routes/categoriaRoute');
const conteudoRota = require('./routes/conteudoRoute');
const perfilRota = require('./routes/perfilRoute');
const planoRota = require('./routes/planoRoute');
const usuarioRota = require('./routes/usuarioRoute');
const usuListaRota = require('./routes/usuListaRoute');
const cors = require('cors');
const app = express();
const swaggerJson = require('./outputSwagger.json');
const swaggerUi = require('swagger-ui-express')


app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(express.json());
app.use('/categoria', categoriaRota);
app.use('/conteudo', conteudoRota);
app.use('/perfil', perfilRota);
app.use('/plano', planoRota);
app.use('/usuario', usuarioRota);
app.use('/favoritos', usuListaRota);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen('4000', function(){
    console.log('Backend em funcionamento');
})