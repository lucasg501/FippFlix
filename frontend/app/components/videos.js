'use client'
import httpClient from "@/app/utils/httpClient";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react"
import Link from "next/link";

export default function Videos() {

    const [videos, setVideos] = useState([]);

    function carregarConteudos(){
        httpClient.get('/conteudo/listar')
        .then((r) => r.json())
        .then((r) => {
            setVideos(r);
        });
    }

    function carregarCategoria(){
        httpClient.get('/categoria/listar')
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            setListaCategoria(r);
        })
    }
    
      useEffect(() => {
        carregarConteudos();
      }, []);
    

    return(
        <div>
                <div>
                    <div className="video-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            videos.map(function (value, index) {
                            return (

                                <div className="col mb-5" style={{ flex: '0 0 33.333%' }}>
                                    <div className="card h-100">
                                            <img className="card-img-top" src={`https://i.ytimg.com/vi/${value.conYtId}/hqdefault.jpg`} alt="..." />
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <p className="card-title">{value.conTitulo}</p>                            
                                            </div>
                                        </div>

                                <div className="text-center" style={{marginBottom: 20}}>
                                    <button style={{ cursor: "pointer", marginRight: 5, borderRadius: 20}} className="btn btn-light">
                                        <Link href={`/components/assistir/${value.conYtId}`} className="site-btn mt-auto" style={{ cursor: "pointer", textDecoration: "none", padding: 15 }}>
                                            Assistir
                                        </Link>
                                    </button>
                                    <button style={{ cursor: "pointer", marginRight: 5, borderRadius: 20, marginLeft: 20 }} className="site-btn">
                                        <FontAwesomeIcon icon={faHeart} /> {/* Ícone de coração */}
                                    </button>
                                </div>

                                </div>
                                    </div>


                        );
                        })}
                    </div>
                </div>       
        </div>
    )
}