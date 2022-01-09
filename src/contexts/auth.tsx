import { createContext, ReactNode, useState, useEffect } from "react"
import api from "../components/api"

type user = {
    nome: string,
    id: number,
    email: string
}

type AuthContextData = {
    user: user | null,
    ContextLogin: Function,
    ContextRegister: Function,
    image: string
}

export const AuthContex = createContext({} as AuthContextData)

type AuthProviderProps = {
    children: ReactNode
}

type LoginProps = {
    email: string,
    senha: string
}

type RegisterProps = {
    email: string,
    senha: string,
    nome: string
}

export function AuthProvider(props: AuthProviderProps){
    const [user, setUser] = useState<user | null>(null)
    const [image, setImage] = useState("")

    async function ContextLogin({email, senha}: LoginProps){
        const response = await api.post("/authenticate", {
            email: email, senha: senha
        })
        if (response.data){
            localStorage.setItem("token", response.data.token)
            setUser(response.data.user)
            if (response.data.user.foto_url !== ""){
                setImage("https://avatars.githubusercontent.com/u/88409903?v=4")
            }
        }
    }

    async function ContextRegister({email, nome, senha}: RegisterProps){
        const response = await api.post("/register", {
            email: email, senha: senha, nome: nome
        })
        if (response.data){
            localStorage.setItem("token", response.data.token)
            setUser(response.data.user)
            if (response.data.user.foto_url !== ""){
                setImage("https://avatars.githubusercontent.com/u/88409903?v=4")
            }
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("token")){
            return
        }

        api.defaults.headers.common.authorizationtoken = String(localStorage.getItem("token"))

        api.get("/profile")
        .then((response) => {
            setUser(response.data.user)
            if (response.data.user.foto_url !== ""){
                setImage("https://avatars.githubusercontent.com/u/88409903?v=4")
            }
        })
        .catch((error) => console.log(error.response))
    }, [])

    return (
        <AuthContex.Provider value={{ user, ContextLogin, ContextRegister, image }}>
            {props.children}
        </AuthContex.Provider>
    )
}