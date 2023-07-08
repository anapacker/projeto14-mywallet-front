import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import DataContextProvider from "../context/DataContextProvider"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setToken } = useContext(DataContextProvider)
  const [isDisable, setIsDisable] = useState("")

  const navigate = useNavigate()

  function loginToAccont(e) {
    e.preventDefault()
    setIsDisable(true)

    let sendDatasToAPi = {
      email: email,
      password: password
    }

    const promisse = axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, sendDatasToAPi)
    promisse.then(res => {
      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      navigate(`/home`)
    })
    promisse.catch((res) => {
      console.log(res);
      if (res.response.status === 401) {
        alert(`Senha inválida`)
      } else {
        alert(res.response.data)
      }
      setIsDisable(false)
    })
  }

  return (
    <SingInContainer>
      <form onSubmit={loginToAccont}>
        <MyWalletLogo />
        <input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isDisable}
          data-test="email"
        />

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          disabled={isDisable}
          data-test="password"
        />

        <button data-test="sign-in-submit" type="submit" disabled={isDisable}>Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
