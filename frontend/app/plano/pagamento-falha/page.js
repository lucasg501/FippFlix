import Link from 'next/link';

export default function PagamentoFalha(){
    return(
        <div>
            <h1>Pagamento não foi realizado!</h1>

            <Link className='site-btn' href='/'>Voltar</Link>
        </div>
    )
}