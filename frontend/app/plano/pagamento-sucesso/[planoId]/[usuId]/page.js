'use client'
import LoadingPage from "@/app/components/loadingPage";
import httpClient from "@/app/utils/httpClient";
import { useEffect, useContext, useRef } from "react";
import UserContext from '../../../../context/userContext';
import { useParams } from "next/navigation";


export default function PagamentoSucesso({params: {planoId, usuId}}){
    let usuarioId = usuId;

    function Pagamento(){
        let status = 0;

        httpClient.post(`/pagamento/pagar/${planoId}/${usuarioId}`)
            .then(r=>{
                status = r.status;
                return r.json();
            })
            .then(r=>{
                if(status == 200){
                    window.location.href = '/';
                }
            })
    }   

    useEffect(()=>{
        Pagamento();
    },[]);

    return(
        <LoadingPage></LoadingPage>
    )
}