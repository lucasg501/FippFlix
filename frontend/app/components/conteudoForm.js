'use client'
import { useEffect, useRef, useState } from "react"
import httpClient from "../utils/httpClient";


export default function conteudoForm(props){

    const conYtId = useRef('');
    const conTitulo = useRef('');
    const conDisponivel = useRef('');
    const categoriaId = useRef('');

    const [listaCategoria, setListaCategoria] = useState([]); // vetor para receber a lista de categorias
    const [conteudo, setConteudo] = props.conteudo ? useState(props.conteudo) : useState ({conId : 0, conYtId: "", conTitulo: "", conDisponivel: "N", categoriaId: 0}); // vetor para receber as props, desmembrando a mesma

    function cadastrarConteudo(){
        let status = 0;
        if(conYtId.current.value != "" && conTitulo.current.value != "" && categoriaId.current.value != 0){ //valida se os campos nao estao vazios

            httpClient.post('/conteudo/criar',{ //puxa os dados para uma variavel que sera enviada para o backend
                conYtId: conYtId.current.value,
                conTitulo: conTitulo.current.value,
                conDisponivel: conDisponivel.current.checked ? "S" : "N",
                categoriaId: categoriaId.current.value
            })
            .then(r=>{
                status = r.status;
                return r.json();
            })
            .then(r=>{
                alert(r.msg);
                if(status == 200){
                    conYtId.current.value = "";
                    conTitulo.current.value = "";
                    conDisponivel.current.checked = false;
                    categoriaId.current.value = 0;
                }
            })
        }else{
            alert("Preencha os campos corretamente");
        }
    }

    function alterarConteudo(){
        let status = 0;
        if(conYtId.current.value != "" && conTitulo.current.value != "" && categoriaId.current.value != 0){
            httpClient.put('/conteudo/alterar',{
                conId: conteudo.conId,
                conYtId: conYtId.current.value,
                conTitulo: conTitulo.current.value,
                conDisponivel: conDisponivel.current.checked ? "S" : "N",
                categoriaId: categoriaId.current.value
            })
            .then(r=>{
                status = r.status;
                return r.json();
            })
            .then(r=>{
                alert(r.msg);
                if(status == 200){
                    window.location.href = "/admin/conteudo";
                }
            })
        }
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

    useEffect(() =>{
        carregarCategoria();
    },[]);


    return(
        <div>
            <div>
                <h1>{conteudo.conId != 0 ? "Alterar Conteudo" : "Cadastrar Conteudo"}</h1>
            </div>

            <div>
                <div className="form-group">
                    <label>Título:</label>
                    <input defaultValue={conteudo.conTitulo} ref={conTitulo} type="text" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label>Link YouTube:</label>
                    <input defaultValue={conteudo.conYtId} ref={conYtId} type="email" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label>Categoria:</label>
                    <select defaultValue={conteudo.categoriaId} ref={categoriaId} className="form-control">
                        <option value={0}>--Selecione--</option>

                        {
                           listaCategoria.map(function(value, index){
                            if(conteudo != null && conteudo.catId == value.catId){
                                return <option selected value={value.catId}>{value.catDescricao}</option>

                            }else{
                                return <option value={value.catId}>{value.catDescricao}</option>
                            }
                           })
                        }

                    </select>
                </div>

                <div className="form-group">
                    <label><input defaultChecked={conteudo.conDisponivel == "S" ? true : false} ref={conDisponivel} type="checkbox"></input> Ativo</label>
                </div>

                <div>
                    <button onClick={conteudo.conId != 0 ? alterarConteudo : cadastrarConteudo} style={{marginRight: 5}} className="btn btn-primary">{conteudo.conId != 0 ? "Alterar" : "Cadastrar"}</button>
                    <a href="/admin/conteudo">
                        <button style={{marginRight: 5}} className="btn btn-secondary">Voltar</button>
                    </a>
                </div>
            </div>
        </div>
    )

}