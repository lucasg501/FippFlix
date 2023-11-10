export default function CriarUsuario(){
    return(
        <div>
            <div>
                <h1>Criar usuario</h1>
            </div>
            <div>

                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" className="form-control"></input>
                </div>

                <div>
                    <button style={{marginRight: 5}} className="btn btn-primary">Criar</button>
                </div>
            </div>
        </div>
    )
}

