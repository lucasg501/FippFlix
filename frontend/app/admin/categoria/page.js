'use client'
import httpClient from "@/app/utils/httpClient";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Categorias(){

    const [listaCategorias, setListaCategorias] = useState([]);

    function carregarCategorias(){
        httpClient.get('/categoria/listar')
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            setListaCategorias(r);
        })
    }

    function excluirCategoria(catId){
        if(confirm("Excluir categoria?")){
            httpClient.delete(`/categoria/excluir/${catId}`)
            .then(r=>{
                return r.json();
            })
            .then(r=>{
                alert(r.msg);
                carregarCategorias();
            })
        }
    }

    useEffect(() =>{
        carregarCategorias();
    },[]);

    return(
        <div>
            <h1>Categorias</h1>
            <div>
                <a href="/admin/categoria/criar"><button className="btn btn-primary">Cadastrar</button></a>
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaCategorias.map(function(value,index){
                                return(
                                    <tr key={index}>
                                        <td>{value.catId}</td>
                                        <td>{value.catDescricao}</td>
                                        <td>
                                            <Link className="btn btn-primary" style={{marginRight: 5}} href={`/admin/categoria/alterar/${value.catId}`}>
                                                <i className="fas fa-pen"></i>
                                            </Link>
                                            <button onClick={() => excluirCategoria(value.catId)} className="btn btn-danger"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}