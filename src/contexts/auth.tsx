import { createContext, ReactNode, useState, useEffect } from "react"
import api from "../components/api"

type user = {
    nome: string
    id: number
    email: string
    foto_url: string
}

type AuthContextData = {
    user: user | null
    ContextLogin: Function
    ContextRegister: Function
    ContextLogOut: Function
}

export const AuthContex = createContext({} as AuthContextData)

type AuthProviderProps = {
    children: ReactNode
}

type LoginProps = {
    email: string
    senha: string
}

type RegisterProps = {
    email: string
    senha: string
    nome: string
}

export function AuthProvider(props: AuthProviderProps){
    const [user, setUser] = useState<user | null>(null)

    async function ContextLogin({email, senha}: LoginProps){
        const response = await api.post("/authenticate", {
            email: email, senha: senha
        })
        if (response.data){
            localStorage.setItem("token", response.data.token)
            setUser(response.data.user)
        }
    }

    async function ContextRegister({email, nome, senha}: RegisterProps){
        const response = await api.post("/register", {
            email: email, senha: senha, nome: nome
        })
        if (response.data){
            localStorage.setItem("token", response.data.token)
            setUser(response.data.user)
        }
    }

    async function ContextLogOut(){
        localStorage.removeItem("token")
        setUser(null)
    }

    useEffect(() => {
        if (!localStorage.getItem("token")){
            return
        }

        api.defaults.headers.common.authorizationtoken = String(localStorage.getItem("token"))

        api.get("/profile")
        .then((response) => {
            setUser(response.data.user)
        })
        .catch((error) => console.log(error.response))
    }, [])

    return (
        <AuthContex.Provider value={{ user, ContextLogin, ContextRegister, ContextLogOut }}>
            {props.children}
        </AuthContex.Provider>
    )
}