'use client'
import ConteudoForm from "@/app/components/conteudoForm"
import httpClient from "@/app/utils/httpClient";
import { httpAgentOptions } from "@/next.config";
import { useEffect, useState } from "react"


export default function AlterarConteudo({params: {conId}}){
    const [conteudo, setConteudo] = useState(null);

    function carregarConteudo(){
        httpClient.get(`/conteudo/obter/${conId}`)
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            setConteudo(r);
        })
    }

    useEffect(() =>{
        carregarConteudo();
    },[]);

    return(
        <div>
            {conteudo != null ? <ConteudoForm conteudo={conteudo}></ConteudoForm> : <div>Carregando...</div>}
        </div>
    )
}