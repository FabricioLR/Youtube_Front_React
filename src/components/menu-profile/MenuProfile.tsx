import React, { useContext } from 'react'
import { AuthContex } from '../../contexts/auth'
import style from "./style.module.css"
import img_login from "../../images/withoutlogin.png"
import { Link } from 'react-router-dom'

function MenuProfile() {
    const { user, ContextLogOut } = useContext(AuthContex)
    return (
        <>
            {user ?
                <div id={style.menu}>
                    <Link to="/profile">
                        <div id={style.info_profile}>
                            <div id={style.image}>
                                <img src={user?.foto_url === "" ? img_login : user?.foto_url} alt="" />
                            </div>
                            <div id={style.nome}>
                                <p>{user.nome}</p>
                            </div>
                        </div>
                    </Link>
                    <div>
                        <div id={style.log_out} onClick={() => ContextLogOut()}>
                            <p>Log Out</p>
                        </div>
                    </div>
                </div>
                : 
                <div id={style.menu}>
                    <div id={style.register}>
                        <Link to="/register">Register</Link>
                    </div>
                    <div id={style.log_in}>
                        <Link to="/login">Log in</Link>
                    </div>
                </div>
            }
        </>
        
    )
}

export default MenuProfile
