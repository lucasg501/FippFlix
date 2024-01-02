'use client'
// Importe os módulos necessários
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import httpClient from "@/app/utils/httpClient";
import UserContext from "../context/userContext";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingPage from "./loadingPage";

// Componente principal
export default function Videos() {
  const { user } = useContext(UserContext);
  const [videosFavoritos, setVideosFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para carregar os favoritos
    const carregarFavoritos = async () => {
      try {
        const response = await httpClient.get(`/favoritos/listar/${user.usuId}`);
        const data = await response.json();
        setVideosFavoritos(data.lista); // Certifique-se de ajustar conforme a estrutura do seu retorno
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        setLoading(false);
      }
    };

    // Chame a função para carregar os favoritos
    carregarFavoritos();
  }, []);

  return (
    <div>
      <div>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="video-list" style={{ display: "flex", flexWrap: "wrap", justifyContent:'flex-start' }}>
            {videosFavoritos.map((value, index) => (
              <div className="col-2 mb-5" style={{ flex: "0 0 33.333%" }} key={index}>
                <div className="card h-100">
                  <img className="card-img-top" src={`https://i.ytimg.com/vi/${value.conYtId}/hqdefault.jpg`} alt="..." />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <p className="card-title">{value.conTitulo}</p>
                    </div>
                  </div>
                  <div className="text-center" style={{ marginBottom: 20 }}>
                    <button style={{ cursor: "pointer", marginRight: 5, borderRadius: 20 }} className="btn btn-light">
                      <Link href={`/components/assistir/${value.conYtId}`} className="site-btn mt-auto" style={{ cursor: "pointer", textDecoration: "none", padding: 15 }}>
                        Assistir
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
