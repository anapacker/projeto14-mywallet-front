import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"


export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isDisable, setIsDisable] = useState("")
  const navigate = useNavigate()

  function validarEmail(email) {
    let isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return isValid.test(email)
  }
  function validarSenha() {
    if (password != confirmPassword) {
      alert(`As senhas tem que ser iguais`)
      return false
    }

    if (password.length < 3) {
      alert(`A senha deve ter no mínimo 3 caracteres.`)
      return false
    }
    return true
  }

  function userRegister(e) {
    e.preventDefault()
    setIsDisable(true)


    if (!validarEmail(email)) {
      alert(`Este e-mail não é válido.`)
      setIsDisable(false)
      return
    }
    if (!validarSenha()) {
      setIsDisable(false)
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

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, dataToSendAPI)
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
      <form onSubmit={userRegister}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={isDisable}
          data-test="name"
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={isDisable}
          data-test="email"
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={isDisable}
          data-test="password"
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          disabled={isDisable}
          data-test="conf-password"
        />

        <button data-test="sign-up-submit" type="submit" disabled={isDisable}>Cadastrar</button>
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
