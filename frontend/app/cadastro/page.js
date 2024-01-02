'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import '../cadastro/cadastro.css'
import httpClient from '../utils/httpClient';
import UserContext from '../context/userContext';

export default function Cadastro() {

    const usuNome = useRef('');
    const usuEmail = useRef('');
    const usuSenha = useRef('');
    const perfilId = 2;
    const [carregando, setCarregando] = useState(false);
    const { user, setUser } = useContext(UserContext);

    function cadastrar() {
        let status = 0;
        if (usuNome.current.value != "" && usuEmail.current.value != "" && usuSenha.current.value != "") {
            httpClient.post('/cliente/criar', {
                usuNome: usuNome.current.value,
                usuEmail: usuEmail.current.value,
                usuSenha: usuSenha.current.value,
                perfilId: perfilId
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status == 200) {
                        autenticar();
                    }
                })
        } else {
            alert("Preencha os campos corretamente");
        }
    }

    function autenticar() {
        let status = 0;

        httpClient.post('/login/autenticar', {
            usuEmail: usuEmail.current.value,
            usuSenha: usuSenha.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    setUser(r.usuario);
                    localStorage.setItem("usuarioLogado", JSON.stringify(r.usuario));
                    window.location.href = "/plano";
                } else {
                    alert(r.msg);
                }
            })
    }


    return (
        <div style={{ backgroundImage: `url('/template/fotos/fundo.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height:'100%' }}>
            <div className='fundo' style={{ backgroundColor: 'rgba(0,0,0,0.6)'}}>
                <h1 style={{ textAlign: 'center', marginTop: '5%', fontWeight: "bold", paddingTop: 35 }}>Cadastre-se</h1>

                <form style={{ marginRight: "30%", marginLeft: "30%", marginTop: "3%" }}>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label style={{ color: 'white', fontSize: 20, textShadow: '2px 2px 0px black' }} className="form-label" for="form6Example1">Nome:</label>
                                <input style={{ border: '1px solid black' }} ref={usuNome} type="text" id="form6Example1" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="form-outline mb-4">
                        <label style={{ color: 'white', fontSize: 20, textShadow: '2px 2px 0px black' }} className="form-label" for="form6Example3">Email:</label>
                        <input style={{ border: '1px solid black' }} ref={usuEmail} type="email" id="form6Example3" className="form-control" />
                    </div>

                    <div className="form-outline mb-4">
                        <label style={{ color: 'white', fontSize: 20, textShadow: '2px 2px 0px black' }} className="form-label" for="form6Example4">Senha:</label>
                        <input style={{ border: '1px solid black' }} ref={usuSenha} type="password" id="form6Example4" className="form-control" />
                    </div>

                    <div style={{ marginTop: "20%", paddingBottom: 35 }} className='text-center'>
                        <button onClick={cadastrar} style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 15, paddingBottom: 15, fontSize: 20 }} className="btn btn-primary">Cadastrar</button>

                        <button style={{ paddingTop: 15, paddingBottom: 15, fontSize: 20, marginLeft: 50 }} className="btn btn-secondary"><a style={{ color: 'white', textDecoration: 'none' }} href='/'>Página Inicial</a></button>
                    </div>

                </form>
            </div>

        </div>

    )
}