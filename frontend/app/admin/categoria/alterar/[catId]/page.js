'use client'
import CategoriaForm from "@/app/components/categoriaForm"
import httpClient from "@/app/utils/httpClient"
import { useEffect, useState } from "react"

export default function AlterarCategoria({params: {catId}}){

    const [categoria, setCategoria] = useState(null);

    function carregarCategoria(){
        httpClient.get(`/categoria/obter/${catId}`)
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            setCategoria(r);
        })
    }

    useEffect(()=>{
        carregarCategoria();
    },[]);

    return(
        <div>
            {categoria != null ? <CategoriaForm categoria={categoria}></CategoriaForm> : <div>Carregando...</div>}
        </div>
    )
}