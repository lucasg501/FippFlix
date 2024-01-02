'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

import '../../../../public/template/css/fontawesome-free/css/all.min.css'

const Assistir = ({params: {conYtId}}) => {
    const router = useRouter();

    return (
        
        <html style={{backgroundColor: '#282424'}}>
        
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="#!">FIPPFLIX</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Início</a></li>
                    </ul>
                </div>
            </div>
        </nav>
            
            
            <div>
                <section style={{marginTop: "5%"}}>
                    <div className="container">
                        <div class="row">
                            <div class="col-lg-12"> 
                                <div>
                                    <iframe style={{borderRadius: 15}} id='player' width="100%" height="600px" src={`https://www.youtube.com/embed/${conYtId}?autoplay=1`} frameBorder="0" allow="autoplay"></iframe>
                                </div>
                            </div>
                            <Link style={{textDecoration: 'none', fontSize: 25, color: "red", display: 'flex', alignItems: 'center', marginTop: '2%'}} href={'/'}>
                                <FontAwesomeIcon icon={faCircleArrowLeft} />
                                <i style={{fontSize: 15, marginLeft: "1%"}}>Voltar</i>
                            </Link>
                        </div> 
                    </div>          
                </section>
            </div>

        </div>
        </html>
    );
}
export default dynamic(() => Promise.resolve(Assistir), {ssr:false})

