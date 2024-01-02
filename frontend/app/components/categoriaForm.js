'use client'
import {useRef, useState, useEffect} from 'react';
import Link from "next/link";
import httpClient from '../utils/httpClient';


export default function CategoriaForm(props){

    const catId = useRef(''); //define os nomes que seram usados dentro do return
    const catDescricao = useRef('');

    const [categoria, setCategoria] = props.categoria ? useState(props.categoria) : useState({catId: 0, catDescricao: ""});

    function cadastrarCategoria(){
        let status = 0;
        if(catDescricao.current.value != ""){
            httpClient.post('/categoria/criar',{
                catDescricao: catDescricao.current.value
            })
            .then(r=>{
                status = r.status;
                return r.json();
            })
            .then(r=>{
                alert(r.msg);
                if(status == 200){
                    catDescricao.current.value = "";
                }
            })
        }else{
            alert("Preencha os campos corretamente");
        }
    }

    function alterarCategoria(){
        let status = 0;
        if(catDescricao.current.value != ""){
            httpClient.put('/categoria/alterar',{
                catId: categoria.catId,
                catDescricao: catDescricao.current.value
            })
            .then(r=>{
                status = r.status;
                return r.json();
            })
            .then(r=>{
                alert(r.msg);
                if(status == 200){
                    window.location.href = '/admin/categoria'
                }
            })
        }
    }


    return(
        <div>
            <div>
                <h1>{categoria.catId != 0 ? "Alterar Categoria" : "Cadastrar Categoria"}</h1>
            </div>
            <div>

                <div className="form-group">
                    <label>Nome da categoria:</label>
                    <input defaultValue={categoria.catDescricao} ref={catDescricao} type="text" className="form-control"></input>
                </div>

                <div>
                    <button onClick={categoria.catId != 0 ? alterarCategoria : cadastrarCategoria} style={{marginRight: 5}} className="btn btn-primary">{categoria.catId != 0 ? "Alterar" : "Cadastrar"}</button>

                    <a href="/admin/categoria">
                    <button style={{marginRight: 5}} className="btn btn-secondary">Voltar</button>
                    </a>
                </div>
            </div>
        </div>
    )
}