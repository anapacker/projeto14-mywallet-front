import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDisable, setIsDisable] = useState("")

  const navigate = useNavigate()

  function loginToAccont(e) {
    e.preventDefault()
    setIsDisable(true)

    let sendDatasToAPi = {
      email: email,
      password: password
    }

    const promisse = axios.post(`htto://localhost:3000/usuario`, sendDatasToAPi)
    promisse.then(res => {
      navigate(`/home`)
    })
    promisse.catch(err => {
      alert(err.response.data.message)
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
          autocomplete="new-password"
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
