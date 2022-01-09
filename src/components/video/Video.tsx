import style from "./style.module.css"

type VideoProps = {
    id: number,
    nome: string,
    url: string,
    visualizacoes: number,
    showvideo: Function
}

function Video(props: VideoProps) {
    return (
        <div className={style.video} id={String(props.id)} onClick={() => props.showvideo(props.id)}>
            <video src={props.url} />
            <div id="info_video">
                <p className="titulo">{props.nome}</p>
                <p className="visualizations">{props.visualizacoes} visualizações</p>
            </div>
        </div>
    )
}

export default Video
