import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import style from "./style.module.css"
import { AuthContex } from "../../contexts/auth"
import { useNavigate } from 'react-router'

function Login() {
    const navigate = useNavigate()
    const { ContextLogin, user } = useContext(AuthContex)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function login(){
        if (email && senha){
            await ContextLogin({email, senha})
            navigate("/")
        }
    }
    return (
        <main id={style.login}>
            <div id={style.conteudo_login}>
                <p>Login</p>
                <div>
                    <label>Email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Senha</label>
                    <input type="text" id="senha" onChange={(e) => setSenha(e.target.value)}/>
                </div>
                <div>
                    <button onClick={login}>Log In</button>
                    <p>Não está cadastrado?<Link to="/register"> Cadastrar</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Login
