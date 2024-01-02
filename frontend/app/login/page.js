'use client'
import { useContext, useRef, useState, useEffect } from "react"
import httpClient from "../utils/httpClient";
import { useRouter } from "next/navigation";
import React from "react"
import UserContext from "../context/userContext";

export default function Login(){

    const email = useRef('');
    const senha = useRef('');
    const {user, setUser} = useContext(UserContext);
    const[carregando, setCarregando] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const audio = document.getElementById('meuAudio');
        audio.play().catch(error => {
          console.error('Erro ao reproduzir áudio:', error);
        });
      });

    function autenticar() {
        setCarregando(true);
        let status = 0;
        if(email.current.value != '' && senha.current.value != ''){
            httpClient.post('/login/autenticar', {
                usuEmail: email.current.value,
                usuSenha: senha.current.value
            })
            .then(r=> {
                status = r.status;
                return r.json();
            })
            .then(r=> {
                if(status == 200){
                setUser(r.usuario);
                localStorage.setItem("usuarioLogado", JSON.stringify(r.usuario));
                if(r.usuario.perfilId == 1){
                    window.location.href = "/admin";
                }else{
                    window.location.href = "/";
                }
                }else{
                    alert(r.msg);
                }
            })
            .catch(r => {

            })
            .finally(r=> {
                setCarregando(false);
            })
        }
        else{
            alert("Preencha os campos corretamente!");
        }
    }

    return (
        <div>
        <section className="vh-100" style={{marginTop: 150}}>

            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center">
                    <div style={{ backgroundImage: 'url("/template/fotos/download.gif")', width: '100%', borderRadius: 25, height: 350, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}  className="col-md-9 col-lg-6 col-xl-4"></div>

                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>

                            <div className="divider d-flex align-items-center my-4">
                                <h1 className="text-center fw-bold mx-3 mb-0">Login</h1>
                            </div>

                            <div className="form-outline mb-4">
                                <input ref={email} type="email" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Email" />
                                <label className="form-label" for="form3Example3">Email</label>
                            </div>

                            
                            <div className="form-outline mb-3">
                                <input ref={senha} type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Senha" />
                                <label className="form-label" for="form3Example4">Senha</label>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" onClick={autenticar} className="btn btn-primary btn-user btn-block">
                                            {carregando ? "Carregando..." : "Login"}</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Ainda não tem uma conta? Registre-se <a href="/cadastro"
                                    className="link">Criar conta</a></p>
                            </div>

                        </form>
                    </div>
                </div>
                <audio style={{width: '10%'}} id="meuAudio" controls autoPlay loop>
                        <source src="/godzilla.mp3" type="audio/mp3" />
                    </audio>
            </div>
        </section>
    </div>
    )
}