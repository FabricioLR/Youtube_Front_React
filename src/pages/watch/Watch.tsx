import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom"
import api from '../../components/api'
import styleHome from "../home/style.module.css"
import { Link } from 'react-router-dom'
import img_login from "../../images/withoutlogin.png"
import { AuthContex } from '../../contexts/auth'
import style from "./style.module.css"

type VideoProps = {
    nome: string,
    url: string,
    visualizacoes: number,
    users: {
        nome: string,
        foto_url: string
    }
}

function Watch() {
    const { user } = useContext(AuthContex)
    const [video, setVideo] = useState<VideoProps>()
    const { id } = useParams()
    
    useEffect(() => {
        api.post("/getexpecifyvideo", {
            videoId: id
        })
        .then((response) => {
            setVideo(response.data.video)
        })
        .catch((error) => console.log(error.response))
    }, [])

    return (
        <>
            <header>
                <div id={styleHome.cabecalho}>
                    <div id={styleHome.pesquisa}>
                        <input type="text"/>
                    </div>
                    <div id={styleHome.login}>
                        <Link to="/login">
                            <img src={user ? (user.foto_url === "" ? img_login : user.foto_url) : img_login} alt="login"/>
                        </Link>
                    </div>
                </div>
            </header>
            <main id={style.conteudo_video}>
                <div id={style.video}>
                    <video src={video?.url} controls/>
                    <div id={style.info_video}>
                        <p>{video?.nome}</p>
                        <p>{video?.visualizacoes} visualizações</p>
                    </div>
                    <div id={style.owner}>
                        <div id={style.image_owner}>
                            <img src={video?.users.foto_url === "" ? img_login : video?.users.foto_url} alt="" />
                        </div>
                        <p>{video?.users.nome}</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Watch
