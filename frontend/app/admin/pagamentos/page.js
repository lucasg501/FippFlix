'use client'
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react"

export default function Pagamentos(){

    const [pagamentos,setPagamentos] = useState([]);

    function listarPagamentos(){
        httpClient.get('/pagamento/listar')
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            setPagamentos(r);
        })
    }

    useEffect(()=>{
        listarPagamentos();
    },[]);


    return(
        <div>
            <h1>Pagamentos</h1>
            {
                pagamentos.length > 0 ?
                <table className="table table-striped">
                    <thead>
                        <th>Id</th>
                        <th>Data</th>
                        <th>Id Usuário</th>
                        <th>Plano</th>
                    </thead>

                    <tbody>
                        {
                            pagamentos.map(function(value,index){
                                return(
                                    <tr>
                                        <td>{value.pagId}</td>
                                        <td>{value.pagData}</td>
                                        <td>{value.usuarioId}</td>
                                        <td>{value.planoId}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                :
                <></>
            }
            
        </div>
    )
}