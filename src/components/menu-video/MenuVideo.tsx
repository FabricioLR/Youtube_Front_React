import React, { useState, useEffect } from 'react'
import style from "./style.module.css"

type MenuVideoProps = {
    functionMenu: Function,
    functionSendVideo: Function,
    progress: number
}

type Arquivo = {
    name: string,
    size: number,
    type: string,
}

function MenuVideo(props: MenuVideoProps) {
    const [name, setName] = useState("")
    const [arquivo, setArquivo] = useState<Arquivo | null>()

    function Exit(){
        props.functionMenu()
    }

    function Send(){
        if (arquivo && name){
            document.getElementById(style.container)?.classList.toggle(style.active_container)
            props.functionSendVideo({ arquivo, name })
        }
    }

    useEffect(() => {
        document.getElementById("circle")!.style.strokeDasharray = String(57 - ((57 * props.progress) / 100))
        if (props.progress === 100){
            const files = document.getElementById("arquivo") as HTMLInputElement
            files.value = ""
            const nome = document.getElementById("nome") as HTMLInputElement
            nome.value = ""
        }
    }, [props.progress])

    return (
        <div id={style.menu_postar_video}>
            <div id={style.conteudo_menu}>
                <div id={style.titulo_sair}>
                    <h3>Postar Vídeo</h3>
                    <span onClick={Exit}></span>
                </div>
                <div id={style.input}>
                    <div id={style.localarquivo}>
                        <label>Arquivo</label>
                        <input type="file" id="arquivo" accept="video/*" onChange={(e) => setArquivo(e.target.files ? e.target.files[0] : null)}/>
                    </div>
                    <div id={style.localnome}>
                        <label>Nome</label>
                        <input type="text" id="nome" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <button onClick={Send} id={style.button_send}>Enviar
                        <div id={style.container}><svg id={style.progress_circle}><circle cx="17" cy="15" r="9"></circle><circle cx="17" cy="15" r="9" id="circle"></circle></svg></div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuVideo
