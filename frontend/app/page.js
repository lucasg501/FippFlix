import Image from "next/image";
import React from "react";
import Videos from "./components/videos";
import VideosCategoria1 from "./components/videoCategoria1";
import VideosCategoria2 from "./components/videoCategoria2";
import VideosCategoria5 from "./components/videoCategoria5";
import VideosCategoria4 from "./components/videoCategoria4";
import VideosCategoria6 from "./components/videoCategoria6";
import VideosCategoria7 from "./components/videosCategoria7";



export default function Home(){
  return(
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="#!">FIPPFLIX</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Início</a></li>
                        <li className="nav-item"><a className="nav-link active" href="#!">Favoritos</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <header className="py-5" style={{backgroundImage: 'url(https://www.caviarcriativo.com/storage/2020/06/logotipo-da-netflix.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 fw-bolder">FIPPFLIX</h1>
                <p className="lead fw-normal text-white-50 mb-0">O streaming mais baiano</p>
            </div>
        </div>
        </header>
        <hr></hr>

        <section style={{backgroundColor: "black"}} className="py-5">
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: "white"}}>Apenas Listando Tudo -- DEPOIS A GENTE APAGA -----</h1>
        </div>
        <div style={{backgroundColor: "black"}} className="container px-4 px-lg-5 mt-5">
                <Videos></Videos>
        </div>
        </section>

        <section style={{backgroundColor: "black"}} className="py-5">
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: "white"}}>Tecnologia</h1>
        </div>
        <div className="container px-4 px-lg-5 mt-5">
                <VideosCategoria1></VideosCategoria1>
        </div>
        </section>

        <section style={{backgroundColor: "black"}} className="py-5">
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: "white"}}>Animes</h1>
        </div>
        <div className="container px-4 px-lg-5 mt-5">
                <VideosCategoria2></VideosCategoria2>
        </div>
        </section>

        <section style={{backgroundColor: "black"}} className="py-5">
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: "white"}}>Comédia</h1>
        </div>
        <div className="container px-4 px-lg-5 mt-5">
                <VideosCategoria4></VideosCategoria4>
        </div>
        </section>

        <section style={{backgroundColor: "black"}} className="py-5">
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: "white"}}>Jogos</h1>
        </div>
        <div className="container px-4 px-lg-5 mt-5">
                <VideosCategoria5></VideosCategoria5>
        </div>
        </section>

        <section style={{backgroundColor: "black"}} className="py-5">
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: "white"}}>Músicas</h1>
        </div>
        <div className="container px-4 px-lg-5 mt-5">
                <VideosCategoria6></VideosCategoria6>
        </div>
        </section>

        <section style={{backgroundColor: "black"}} className="py-5">
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: "white"}}>Memes</h1>
        </div>
        <div className="container px-4 px-lg-5 mt-5">
                <VideosCategoria7></VideosCategoria7>
        </div>
        </section>

        <footer className="py-5 bg-dark">
        <div className="container"><p className="m-0 text-center text-white">Copyright &copy; FIPPFLIX a Netflix do Paraguai</p></div>
        </footer>
</div>    
  )
}