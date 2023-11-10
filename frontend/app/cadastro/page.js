import '../cadastro/cadastro.css'

export default function Cadastro() {
    return (
        <div className='fundo'>
            <h1 style={{ textAlign: 'center', marginTop: '3%', fontWeight: "bold" }}>Cadastre-se</h1>

            <form style={{ margin: 100 }}>
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="form6Example1" className="form-control" />
                            <label style={{color: 'white', fontSize: 20}} className="form-label" for="form6Example1">Nome</label>
                        </div>
                    </div>
                </div>

                <div className="form-outline mb-4">
                    <input type="email" id="form6Example3" className="form-control" />
                    <label style={{color: 'white', fontSize: 20}} className="form-label" for="form6Example3">Email</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form6Example4" className="form-control" />
                    <label style={{color: 'white', fontSize: 20}} className="form-label" for="form6Example4">Senha</label>
                </div>

                {/*<div className="form-check d-flex justify-content-center mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form6Example8" checked />
                    <label style={{color: 'white', fontSize: 20}} className="form-check-label" for="form6Example8"> Create an account? </label>
                </div> */}









    <section  className="wrapper">
        <div className="container" >
            <div className="row">

                <div className="col-sm-12 col-md-6 col-lg-4 mb-4 mx-auto" id='banner1'>
                    <div onClick={{ref:1}} className="card text-dark card-has-bg click-col " style={{ backgroundImage: 'url(https://img.elo7.com.br/product/zoom/1EE247E/big-poster-do-anime-one-punch-man-tamanho-90x-0-cm-lo009-decoracao-geek.jpg)'}}>
                    <div className="card-img-overlay d-flex flex-column">
                            <div className="card-body">

                                <h4 className="card-title mt-0 ">
                                    <a className="text-dark">Plano Standard</a>
                                </h4>

                                <h5 style={{color: 'white'}} className="card-title mt-0 ">
                                    <a style={{textDecoration: 'none'}} className="text-dark">-1 tela</a>
                                </h5>

                                <h5 className="card-title mt-0 ">
                                    <a style={{textDecoration: 'none'}} className="text-dark">-Conteúdos em resolução Full HD</a>
                                </h5>

                                <br></br><br></br><br></br><br></br>  

                                <h2 className="card-title mt-0 ">
                                    <a style={{textDecoration: 'none'}} className="text-dark">R$24.90 Mensais</a>
                                </h2>

                                <small>A oferta é valida somente para alunos FIPP</small>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-4 mb-4 mx-auto">
                    <div onClick={{ref:0}} className="card text-dark card-has-bg click-col" style={{ backgroundImage: 'url(https://br.web.img3.acsta.net/pictures/19/09/18/13/46/0198270.jpg)' }}>
                        <div className="card-img-overlay d-flex flex-column">
                            <div className="card-body">

                                <h4 className="card-title mt-0 ">
                                    <a className="text-dark">Plano Premium</a>
                                </h4>

                                <h5 style={{color: 'white'}} className="card-title mt-0 ">
                                    <a style={{textDecoration: 'none'}} className="text-dark">-Até 4 telas simultâneas</a>
                                </h5>

                                <h5 className="card-title mt-0 ">
                                    <a style={{textDecoration: 'none'}} className="text-dark">-Conteúdos em resolução 4K</a>
                                </h5>

                                <br></br><br></br><br></br><br></br>  

                                <h2 className="card-title mt-0 ">
                                    <a style={{textDecoration: 'none'}} className="text-dark">R$34.90 Mensais</a>
                                </h2>

                                <small>A oferta é valida somente para alunos FIPP</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>

        <button style={{paddingLeft: 35, paddingRight: 35, paddingTop: 15, paddingBottom: 15, fontSize: 20}} type="submit" className="btn btn-primary btn-block mb-4">Cadastrar</button>

        <button style={{paddingLeft: 35, paddingRight: 35, paddingTop: 15, paddingBottom: 15, fontSize: 20, marginLeft: 50}} type="submit" className="btn btn-secondary btn-block mb-4"><a style={{color: 'white', textDecoration: 'none'}} href='/'>Página Inicial</a></button>

    </form>
</div>

)
}