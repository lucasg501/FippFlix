'use client'
import { httpAgentOptions } from "@/next.config";
import React, { useContext, useEffect, useState } from "react";
import httpClient from "../utils/httpClient";

export default function Home() {

    const [listaFavoritos, setListaFavoritos] = useState([]);

    function carregarFavoritos() {
        httpClient.get('/favoritos/listar')
            .then(r => {
                return r.json();
            })
            .then(r => {
                setListaFavoritos(r);
            })
    }

    useState(() => {
        carregarFavoritos();
    }, []);



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">FIPPFLIX</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Início</a></li>
                        <li className="nav-item"><a className="nav-link active" href="/favoritos">Favoritos</a></li>
                    </ul>
                    {/* Utilizando a classe ms-auto para movimentar o item de categoria para o canto direito */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active">Bem vindo:</a></li>
                    </ul>
                </div>
            </nav>


            <header className="py-5" style={{ backgroundColor: 'black', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: "30%" }}>
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">FIPPFLIX</h1>
                        <p className="lead fw-normal text-white-50 mb-0">O streaming mais baiano</p>
                    </div>
                </div>
            </header>


            <section style={{ backgroundColor: "#282424" }} className="py-5">
                <hr style={{ backgroundColor: 'white', height: 2 }}></hr>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: "white" }}>Favoritos</h1>
                </div>
                <div style={{ backgroundColor: "#282424" }} className="container px-4 px-lg-5 mt-5">

                    {
                        carregarFavoritos.map(function (value, index) {
                            return (
                                <div className="col mb-5" style={{ flex: '0 0 33.333%' }}>
                                    <div className="card h-100">
                                        <img className="card-img-top" src={`https://i.ytimg.com/vi/${value.conYtId}/hqdefault.jpg`} alt="..." />
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <p className="card-title">{value.conTitulo}</p>
                                            </div>
                                        </div>

                                        <div className="text-center" style={{ marginBottom: 20 }}>
                                            <button style={{ cursor: "pointer", marginRight: 5, borderRadius: 20 }} className="btn btn-light">
                                                <Link href={`/components/assistir/${value.conYtId}`} className="site-btn mt-auto" style={{ cursor: "pointer", textDecoration: "none", padding: 15 }}>
                                                    Assistir
                                                </Link>
                                            </button>
                                            <button onClick={adcFavorito} style={{ cursor: "pointer", marginRight: 5, borderRadius: 20, marginLeft: 20 }} className="site-btn">
                                                <FontAwesomeIcon ref={conId} icon={faHeart} /> {/* Ícone de coração */}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </section>

            <footer className="py-5 bg-dark">
                <div className="container"><p className="m-0 text-center text-white">Copyright &copy; FIPPFLIX a Netflix do Paraguai</p></div>
            </footer>
        </div>
    )
}