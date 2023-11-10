'use client'
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react"
import AlterarCategoria from "../categoria/alterar/[catId]/page";
import AlterarConteudo from "./alterar/[conId]/page";
import Link from "next/link";

export default function Conteudo(){

    const [listaConteudo, setListaConteudo] = useState([]);
    const [listaCategoria, setListaCategoria] = useState([]);

    function carregarConteudos(){
        httpClient.get('/conteudo/listar')
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            setListaConteudo(r);
        })
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

    function excluirConteudos(conId){
        if(confirm("Excluir conteudo?")){
            httpClient.delete(`/conteudo/excluir/${conId}`)
            .then(r=>{
                return r.json();
            })
            .then(r=>{
                alert(r.msg);
                carregarConteudos();
            })
        }
    }

    useEffect(() =>{
        carregarConteudos();
        carregarCategoria();
    },[]);

    return(
        <div>
            <h1>Conteúdos já cadastrados</h1>
            <div>
                <a href="/admin/conteudo/criar"><button className="btn btn-primary">Cadastrar</button></a>
            </div>

            <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {
                    listaConteudo.map(function(value,index){
                        return(
                            
                                

                                    <div className="col mb-5">
                                        <div className="card h-100">
                                        <img className="card-img-top" src= {`https://i.ytimg.com/vi/${value.conYtId}/hqdefault.jpg`} alt="..." />

                                            <div className="card-body p-4">
                                                <div className="text-center">
                                                    <h5 className="fw-bolder">{value.conTitulo}</h5>          
                                                </div>
                                            </div>

                                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                <Link className="btn btn-primary" href={`/admin/conteudo/alterar/${value.conId}`}>
                                                    <i className="fas fa-pen"></i>
                                                </Link>
                                                <button onClick={() => excluirConteudos(value.conId)} style={{marginLeft: 8}} className="btn btn-danger"><i href="" className="fas fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                
                            
                        )
                    })
                }   
                </div> 
                </div>
            </section>

        </div>
    )
}