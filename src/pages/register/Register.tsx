import React, { useContext, useState } from 'react'
import style from "./style.module.css"
import { AuthContex } from '../../contexts/auth'
import { useNavigate } from 'react-router'

function Register() {
    const navigate = useNavigate()
    const { ContextRegister } = useContext(AuthContex)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")

    async function register(){
        if (email && senha && nome){
            await ContextRegister({email, senha, nome})
            navigate("/")
        }
    }
    return (
        <div id={style.cadastro}>
            <div id={style.conteudo_cadastro}>
                <p>Cadastrar</p>
                <div>
                    <label>Nome</label>
                    <input type="text" id="nome" onChange={(e) => setNome(e.target.value)}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Senha</label>
                    <input type="text" id="senha" onChange={(e) => setSenha(e.target.value)}/>
                </div>
                <div>
                    <button onClick={register}>Cadastrar</button>
                </div>
            </div>
        </div>
    )
}

export default Register
