import React, { useContext, useEffect, useState } from 'react'
import { AuthContex } from '../../contexts/auth'
import style from "./style.module.css"
import img_login from "../../images/withoutlogin.png"

type Arquivo = {
    name: string,
    size: number,
    type: string,
}

function Profile() {
    const { user, ContextChangeImage } = useContext(AuthContex)
    const [image, setImage] = useState<Arquivo | null>()

    function changeImage(){
        if (image && user){
            ContextChangeImage(image)
        }
    }

    return (
        <div id={style.profile}>
            <div>
                <div id={style.image}>
                    <img src={user?.foto_url === "" ? img_login : user?.foto_url} alt="foto" />
                </div>
                <div id={style.name}>
                    <p>{user?.nome}</p>
                </div>
            </div>
            <div id={style.info_profile}>
                <div id={style.change_img}>
                    <p>Trocar Imagem de Perfil</p>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}/>
                    <button onClick={changeImage}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
