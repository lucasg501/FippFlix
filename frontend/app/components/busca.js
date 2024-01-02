'use client'
import httpClient from "@/app/utils/httpClient";
import { useContext,useEffect, useState } from "react";
import Link from "next/link";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from "../context/userContext";

export default function Buscar() {
    const { user } = useContext(UserContext);
    const [videos, setVideos] = useState([]);
    const [buscaDescricao, setBuscaDescricao] = useState(""); 

    function buscarConteudos() {
        httpClient.get(`/busca/listar/${buscaDescricao}`)
        .then((r) => r.json())
        .then((r) => {
            console.log(r);
            setVideos(r.lista);
        });
    }

    function adicionarFavoritos(conId){
        let status = 0;
        httpClient.post('/favoritos/criar',{
            usuarioId: user.usuId,
            conteudoId: conId
        })
        .then(r => {
            status = r.status;
            return r.json;
        })
        .then(r => {
            window.location.reload();
        })
    }


    useEffect(() => {
        buscarConteudos();
    }, []);

    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    style={{ width: '300px' }}
                    className="form-control"
                    placeholder="Digite o nome"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    value={buscaDescricao}
                    onChange={(e) => setBuscaDescricao(e.target.value)}
                />
                <div className="input-group-append">
                    <button
                        onClick={buscarConteudos}
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                    >
                        Buscar
                    </button>
                </div>
            </div>

            <div className="video-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'flex-start', maxWidth: '1200px', margin: '0 auto' }}>
                {videos.map(function (value, index) {
                    return (
                        <div className="col-2 mb-5" style={{ flex: '0 0 33.333%', maxWidth: '300px', height: '400px' }} key={index}>
                            <div className="card h-100 d-flex flex-column justify-content-between">
                                <img
                                    className="card-img-top"
                                    src={`https://i.ytimg.com/vi/${value.conYtId}/hqdefault.jpg`}
                                    alt="..."
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
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
                                    <button onClick={() => adicionarFavoritos(value.conId)} style={{ cursor: "pointer", borderRadius: 20, marginLeft: 20 }} className="site-btn">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
