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
    console.log("dados", sendDatasToAPi)

    const promisse = axios.post(`http://localhost:5000/sign-in`, sendDatasToAPi)
    console.log(promisse);
    promisse.then(res => {
      setToken(res.data.token)
      navigate(`/home`)
    })
    promisse.catch((res) => {
      console.log(res);
      alert(res.response.data)
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
        />

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          disabled={isDisable}
        />

        <button type="submit" disabled={isDisable}>{!isDisable ? 'Entrar' : isDisable}</button>
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
