'use client'
import React, { useContext, useEffect, useState } from "react";
import Videos from "./components/videos";
import VideosCategoria1 from "./components/videoCategoria1";
import VideosCategoria2 from "./components/videoCategoria2";
import VideosCategoria5 from "./components/videoCategoria5";
import VideosCategoria4 from "./components/videoCategoria4";
import VideosCategoria6 from "./components/videoCategoria6";
import VideosCategoria7 from "./components/videosCategoria7";
import UserContext from "./context/userContext";
import httpClient from "./utils/httpClient";
import LoadingPage from "./components/loadingPage";
import Buscar from "./components/busca";
import banner from '../public/template/fotos/banner.jpg'



export default function Home() {

    const {user, setUser} = useContext(UserContext);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    })

    function logout() {
        let status = 0;
        httpClient.get('/login/logout')
        .then(r=> {
            status = r.status;
        })
        .then(r=> {
            if(status == 200){
                setUser(null);
                localStorage.removeItem("usuarioLogado")
                window.location.href = '/login';
            }
        })
    }

    if(user == null){
        return (
            window.location.href = '/login'
        )
    }

    return (
        <div style={{backgroundColor: '#282424'}}>
            <nav style={{cursor: 'pointer', borderBottom: '1px solid black'}}  className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">FIPPFLIX</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Início</a></li>
                        
                    </ul>
                    {/* Utilizando a classe ms-auto para movimentar o item de categoria para o canto direito */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link active">Bem vindo: {user != null && isClient ? user.usuEmail : "Carregando..."}</a></li>

                        <button className="btn btn-outline" onClick={logout} >Sair</button>
                    </ul>
                </div>
            </nav>



            <div style={{height: 750, width:'100%', margin: 'auto', backgroundColor:'#rgba(0.0.0.0.5)'}}>
                <div style={{backgroundImage: 'url("/template/fotos/FIPPFLIX.jpg")', backgroundSize:'cover', height: '100%',width:'80%' , backgroundRepeat: 'no-repeat', margin: 'auto', marginTop: '2%'}}>
                </div>
            </div>


            <section style={{ backgroundColor: "#282424" }} className="py-1">
                <div style={{ backgroundColor: "#282424"}} className="container-fluid px-4 px-lg-5 mt-5">
                <Buscar></Buscar>
                </div>
            </section>


            <section style={{ backgroundColor: "#282424" }} className="py-5">
                <div style={{ textAlign: 'left', marginLeft: '3%' }}>
                    <h1 style={{ color: "white" }}>Favoritos</h1>
                </div>
                <div style={{ backgroundColor: "#282424" }} className="container-fluid px-4 px-lg-5 mt-5">
                    <Videos></Videos>
                </div>
            </section>

            <section style={{ backgroundColor: "#282424" }} className="py-5">
                <div style={{ textAlign: 'left', marginLeft: '3%' }}>
                    <h1 style={{ color: "white" }}>Tecnologia</h1>
                </div>
                <div className="container-fluid px-4 px-lg-5 mt-5">
                    <VideosCategoria1></VideosCategoria1>
                </div>
            </section>

            <section style={{ backgroundColor: "#282424" }} className="py-5">
                <div style={{ textAlign: 'left', marginLeft: '3%' }}>
                    <h1 style={{ color: "white" }}>Animes</h1>
                </div>
                <div className="container-fluid px-4 px-lg-5 mt-5">
                    <VideosCategoria2></VideosCategoria2>
                </div>
            </section>

            <section style={{ backgroundColor: "#282424" }} className="py-5">
                <div style={{ textAlign: 'left', marginLeft: '3%' }}>
                    <h1 style={{ color: "white" }}>Comédia</h1>
                </div>
                <div className="container-fluid px-4 px-lg-5 mt-5">
                    <VideosCategoria4></VideosCategoria4>
                </div>
            </section>

            <section style={{ backgroundColor: "#282424" }} className="py-5">
                <div style={{ textAlign: 'left', marginLeft: '3%' }}>
                    <h1 style={{ color: "white" }}>Jogos</h1>
                </div>
                <div className="container-fluid px-4 px-lg-5 mt-5">
                    <VideosCategoria5></VideosCategoria5>
                </div>
            </section>

            <section style={{ backgroundColor: "#282424" }} className="py-5">
                <div style={{ textAlign: 'left', marginLeft: '3%' }}>
                    <h1 style={{ color: "white" }}>Músicas</h1>
                </div>
                <div className="container-fluid px-4 px-lg-5 mt-5">
                    <VideosCategoria6></VideosCategoria6>
                </div>
            </section>

            <section style={{ backgroundColor: "#282424" }} className="py-5">
                <div style={{ textAlign: 'left', marginLeft: '3%' }}>
                    <h1 style={{ color: "white" }}>Memes</h1>
                </div>
                <div className="container-fluid px-4 px-lg-5 mt-5">
                    <VideosCategoria7></VideosCategoria7>
                </div>
            </section>

            <footer className="py-5">
                <div className="container"><p className="m-0 text-center text-white">Copyright &copy; FIPPFLIX</p></div>
            </footer>
        </div>
    )
}