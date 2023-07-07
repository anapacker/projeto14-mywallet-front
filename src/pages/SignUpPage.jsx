import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"


export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDisable, setIsDisable] = useState("")
  const navigate = useNavigate()

  function validarEmail(email) {
    let isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return isValid.test(email)
  }

  function userRegister(e) {
    e.preventDefault()
    setIsDisable(true)

    if (!validarEmail(email)) {
      alert(`Este e-mail não é válido.`)
      return
    }

    let dataToSendAPI = {
      email,
      name,
      password
    }
    if (name === "") {
      alert(`Nome obrigatório.`)
      return
    }

    if (password.length < 3) {
      alert(`A senha deve ter no mínimo 3 caracteres.`)
      return
    }
    const promise = axios.post(`http://localhost:5000/sign-up`, dataToSendAPI)
    promise.then(() => {
      navigate("/")
    })
    promise.catch((res) => {
      alert(`${res.response.data}`)
      setIsDisable(false)
    })
  }

  return (
    <SingUpContainer>
      <form onSubmit={dataToSendAPI}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={isDisable}
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={isDisable}
        />
        <input
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={isDisable}
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autocomplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={isDisable}
        />

        <button type="submit" disabled={isDisable}>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
