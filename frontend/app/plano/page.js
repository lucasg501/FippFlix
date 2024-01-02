'use client'
import { useContext, useEffect, useState } from 'react'
import '../cadastro/cadastro.css'
import httpClient from '../utils/httpClient';
import UserContext from '../context/userContext';

export default function selecionaPlano() {


    const { user, setUser } = useContext(UserContext);
    const [planos, setPlanos] = useState([]);

    function listarPlano() {
        httpClient.get('/plano/listar')
            .then(r => {
                return r.json();
            })
            .then(r => {
                setPlanos(r);
            })
    }

    useEffect(() => {
        listarPlano();
    }, []);

    function realizarPagamento(planoId, planoValor, planoNome) {
        let status = 0;
        httpClient.post('/pagamento/checkout', {
            planoId: planoId,
            planoValor: planoValor,
            planoNome: planoNome,
            usuId: user.usuId
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    window.location.href = r.url;
                }
            })
    }



    return (
        <div>
        <section className="wrapper">
            <div className='text-center' style={{ marginBottom: '5%' }}>
                <h1>Selecione o Plano</h1>
            </div>
            <div className="container" >
                <div className="row">


                    {/*DIV DO PAGAMENTO STANDARD*/}
                    {
                        planos.map(function (value, index) {
                            return (
                                <div className="col-sm-12 col-md-6 col-lg-4 mb-4 mx-auto" id='banner1'>
                                    <div onClick={{ ref: 1 }} className="card text-dark card-has-bg click-col " style={{ backgroundColor: 'white' }} >
                                        <div className="card-img-overlay d-flex flex-column">
                                            <div className="card-body">

                                                <a style={{display:'none'}}>{value.planoId}</a>

                                                <h4 className="card-title mt-0 ">
                                                    <a className="text-dark">{value.planoNome}</a>
                                                </h4>

                                                <h5 className="card-title mt-0 ">
                                                    <a style={{ textDecoration: 'none' }} className="text-dark">{value.planoDescricao}</a>
                                                </h5>

                                                <br></br><br></br><br></br><br></br>

                                                <h2 className="card-title mt-0 ">
                                                    <a style={{ textDecoration: 'none' }} className="text-dark">R${value.planoValor} Mensais</a>
                                                </h2>

                                                <small>A oferta é valida somente para alunos FIPP</small>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <button onClick={() => realizarPagamento(value.planoId, value.planoValor, user.usuId)} className='btn btn-primary text-center' style={{ padding: 20, marginTop: 30 }}>Pagar</button>
                                    </div>
                                </div>

                            )
                        })
                    }
                    {/*DIV DO PAGAMENTO STANDARD*/}
                </div>

            </div>

        </section>
        </div>
    )
}