import React, { useContext, useEffect, useState } from 'react'
import style from "./style.module.css"
import styleMenu from "../../components/menu-video/style.module.css"
import img_login from "../../images/withoutlogin.png"
import { Link } from 'react-router-dom'
import MenuVideo from "../../components/menu-video/MenuVideo"
import api from "../../components/api"
import storage from "../../components/firebase"
import { AuthContex } from '../../contexts/auth'
import Video from "../../components/video/Video"
import { useNavigate } from "react-router-dom"
import { FaSistrix } from "react-icons/fa"

type SendVideoProps = {
    name: string,
    arquivo: Blob,
    nome_arquivo: string
}

type VideoProps = {
    id: number,
    nome: string,
    url: string,
    visualizacoes: number
}

function Home() {
    const navigate = useNavigate()
    const { user, image } = useContext(AuthContex)
    const [videos, setVideos] = useState([])
    const [nameSearch, setNameSearch] = useState("")

    useEffect(() => {
        api.get("/getvideos")
        .then((response) => {
            setVideos(response.data.videos)
        })
    }, [])

    async function SendVideo({ arquivo, name, nome_arquivo }: SendVideoProps){
        if (user){
            const upload = storage.ref().child("videos").child(nome_arquivo).put(arquivo)
            upload.snapshot.ref.getDownloadURL().then(async function(url){
                api.defaults.headers.common.authorizationtoken = String(localStorage.getItem("token"))
                const response = await api.post("/addvideo", {
                    nome: name, url: url, owner: user.id
                })
                if (response){
                    ShowMenu()
                    window.location.reload()
                }
            })
        }
    }

    function ShowMenu(){
        document.getElementById(styleMenu.menu_postar_video)?.classList.toggle(styleMenu.active)
    }

    async function ShowVideo(id: number){
        await api.put("/updatevisualizacoes", {
            videoId: id
        })
        navigate("/watch/" + id)
    }

    function Search(){
        if (nameSearch !== ""){
            navigate("/search/" + nameSearch)
        }
    }

    return (
        <>
            <MenuVideo functionMenu={ShowMenu} functionSendVideo={SendVideo}/>
            <header>
                <div id={style.cabecalho}>
                    <div id={style.pesquisa}>
                        <input type="text" onChange={(e) => setNameSearch(e.target.value)}/>
                        <FaSistrix style={{color: "white", height: 26, backgroundColor: "#282828", paddingLeft: 7, paddingRight: 7, border: "1px solid rgb(112, 112, 112)", cursor: "pointer"}} onClick={Search}/>
                    </div>
                    <div id={style.login}>
                        <Link to="/login">
                            <img src={image || img_login} alt="login"/>
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                <div id={style.conteudo}>
                    <div id={style.videos}>
                        {videos.map((video: VideoProps) => <Video 
                            key={video.id}
                            id={video.id}
                            url={video.url}
                            nome={video.nome}
                            visualizacoes={video.visualizacoes}
                            showvideo={ShowVideo}
                        />)}
                    </div>
                </div>
            </main>
            <footer>
                <div id={style.rodape}>
                    <div id={style.creditos}>
                        <p>Feito Por FabrícioLR</p>
                    </div>
                    <div id={style.postar_video}>
                        <button onClick={ShowMenu}>Enviar Vídeo</button>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Home
