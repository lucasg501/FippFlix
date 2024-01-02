

export default function LoadingPage() {

    return (
        <div style={{
            height: '650px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Carregando...</span>
            </div>
        </div>
    )

}