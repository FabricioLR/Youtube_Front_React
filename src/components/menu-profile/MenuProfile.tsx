import React, { useContext } from 'react'
import { AuthContex } from '../../contexts/auth'
import style from "./style.module.css"
import img_login from "../../images/withoutlogin.png"

function MenuProfile() {
    const { user, ContextLogOut } = useContext(AuthContex)
    return (
        <>
            {user ?
                <div id={style.menu}>
                    <div id={style.info_profile}>
                        <div id={style.image}>
                            <img src={user?.foto_url === "" ? img_login : user?.foto_url} alt="" />
                        </div>
                        <div id={style.nome}>
                            <p>{user.nome}</p>
                        </div>
                    </div>
                    <div>
                        <div id={style.log_out} onClick={() => ContextLogOut()}>
                            <p>Log Out</p>
                        </div>
                    </div>
                </div>
                : 
                <div id={style.menu}>
                    <div id={style.register}>
                        <a href="/register">Register</a>
                    </div>
                    <div id={style.log_in}>
                        <a href="/login">Log in</a>
                    </div>
                </div>
            }
        </>
        
    )
}

export default MenuProfile
