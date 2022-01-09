import React, { useState } from 'react'
import style from "./style.module.css"

type MenuVideoProps = {
    functionMenu: Function,
    functionSendVideo: Function
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
            props.functionSendVideo({ arquivo, name, nome_arquivo: arquivo.name })
        }
    }
    return (
        <div id={style.menu_postar_video}>
            <div id={style.conteudo_menu}>
                <div id={style.titulo_sair}>
                    <h3>Postar_video</h3>
                    <span onClick={Exit}></span>
                </div>
                <div id={style.input}>
                    <div id={style.localarquivo}>
                        <label>Arquivo</label>
                        <input type="file" id="arquivo" onChange={(e) => setArquivo(e.target.files ? e.target.files[0] : null)}/>
                    </div>
                    <div id={style.localnome}>
                        <label>Nome</label>
                        <input type="text" id="nome" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <button onClick={Send}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default MenuVideo
