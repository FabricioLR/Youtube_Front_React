import React, { useContext, useEffect, useState } from 'react'
import style from "./style.module.css"
import styleMenu from "../../components/menu-video/style.module.css"
import styleProfile from "../../components/menu-profile/style.module.css"
import img_login from "../../images/withoutlogin.png"
import MenuVideo from "../../components/menu-video/MenuVideo"
import api from "../../components/api"
import { AuthContex } from '../../contexts/auth'
import Video from "../../components/video/Video"
import { useNavigate } from "react-router-dom"
import { FaSistrix } from "react-icons/fa"
import MenuProfile from "../../components/menu-profile/MenuProfile"

type SendVideoProps = {
    name: string,
    arquivo: Blob,
}

type VideoProps = {
    id: number,
    nome: string,
    url: string,
    visualizacoes: number
}

function Home() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContex)
    const [videos, setVideos] = useState([])
    const [nameSearch, setNameSearch] = useState("")
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        api.get("/GetVideos")
        .then((response) => {
            setVideos(response.data.videos)
        })
    }, [])

    async function SendVideo({ arquivo, name }: SendVideoProps){
        if (user){
            const data = new FormData()
            data.append("file", arquivo)
            api.post("/CreateVideo", data, {
                headers: {
                    nome: name, 
                    owner: String(user.id)
                },
                onUploadProgress: (e) => {
                    const progress_ = Math.round((e.loaded * 100) / e.total)
                    setProgress(progress + progress_)
                    if (progress_ === 100){
                        document.getElementById(styleMenu.container)?.classList.toggle(styleMenu.active_container)
                        setProgress(0)
                        window.alert("success")
                    }
                }
            })
        } else {
            window.alert("user not authenticated")
            document.getElementById(styleMenu.container)?.classList.toggle(styleMenu.active_container)
        }
    }

    function ShowMenu(){
        document.getElementById(styleMenu.menu_postar_video)?.classList.toggle(styleMenu.active)
    }

    async function ShowVideo(id: number){
        await api.put("/UpdateVisualizations", {
            videoId: id
        })
        navigate("/watch/" + id)
    }

    function Search(){
        if (nameSearch !== ""){
            navigate("/search/" + nameSearch)
        }
    }

    function ShowProfile(){
        document.getElementById(styleProfile.menu)?.classList.toggle(styleProfile.activeProfile)
    }

    console.log(user)

    return (
        <>
            <MenuVideo functionMenu={ShowMenu} functionSendVideo={SendVideo} progress={progress}/>
            <header>
                <div id={style.cabecalho}>
                    <div id={style.pesquisa}>
                        <input type="text" onChange={(e) => setNameSearch(e.target.value)}/>
                        <FaSistrix style={{color: "white", height: 26, backgroundColor: "#282828", paddingLeft: 7, paddingRight: 7, border: "1px solid rgb(112, 112, 112)", cursor: "pointer"}} onClick={Search}/>
                    </div>
                    <div id={style.login} onClick={ShowProfile}>
                        <img src={user ? (user.foto_url === "" ? img_login : user.foto_url) : img_login} alt="login"/>
                    </div>
                </div>
            </header>
            <MenuProfile/>
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
