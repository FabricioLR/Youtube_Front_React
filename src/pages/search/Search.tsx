import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import api from '../../components/api'
import VideoSearch from "../../components/video-seach/VideoSearch"
import { FaSistrix } from "react-icons/fa"
import style from "./style.module.css"
import { useNavigate } from "react-router-dom"

type VideoProps = {
    id: number,
    nome: string,
    url: string,
    visualizacoes: number,
    users: {
        nome: string,
        foto_url: string
    }
}

function Search() {
    const navigate = useNavigate()
    const [newName, setNewname] = useState("")
    const [videos, setVideos] = useState([])
    const { nameSearch } = useParams()

    useEffect(() => {
        api.post("/SearchVideos", {
            namesearch: nameSearch
        })
        .then((response) => setVideos(response.data.videos))
    }, [])

    function search(){
        if (newName !== ""){
            navigate("/search/" + newName)
            window.location.reload()
        }
    }

    return (
        <>
            <header>
                <div id={style.cabecalho}>
                    <div id={style.pesquisa}>
                        <input type="text" onChange={(e) => setNewname(e.target.value)}/>
                        <FaSistrix style={{color: "white", height: 26, backgroundColor: "#282828", paddingLeft: 7, paddingRight: 7, border: "1px solid rgb(112, 112, 112)", cursor: "pointer"}} onClick={search}/>
                    </div>
                </div>
            </header>
            <main id={style.conteudo_search}>
                <div id="videos">
                    {videos.length === 0 ?
                    <h1>Sem Resultados</h1>
                    :
                    videos.map((video: VideoProps) => (<VideoSearch 
                        url={video.url}
                        foto_url={video.users.foto_url}
                        nome={video.nome}
                        nome_owner={video.users.nome}
                        visualizacoes={video.visualizacoes}
                        id={String(video.id)}
                        key={video.id}
                    />))}
                </div>
            </main>
        </>
    )
}

export default Search
