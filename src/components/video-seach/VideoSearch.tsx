import React from 'react'
import style from "./style.module.css"
import image from "../../images/withoutlogin.png"

type VideoSearchProps = {
    url: string,
    nome: string,
    visualizacoes: number,
    foto_url: string,
    nome_owner: string
}

function VideoSearch(props: VideoSearchProps) {
    return (
        <div className={style.video}>
            <video src={props.url}/>
            <div id={style.info_video}>
                <p>{props.nome}</p>
                <p>{props.visualizacoes} visualizações</p>
                <div id={style.owner}>
                    <div id={style.image}>
                        <img src={props.foto_url === "" ? image : props.foto_url} alt="" />
                    </div>
                    <p>{props.nome_owner}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoSearch
