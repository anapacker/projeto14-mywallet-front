import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import DataContextProvider from "../context/DataContextProvider"

export default function TransactionsPage() {
  const { tipo } = useParams()
  const [valor, setValor] = useState("")
  const [descricao, setDescricao] = useState("")
  const { token } = useContext(DataContextProvider)
  const navigate = useNavigate()


  function saveNewTransac(e) {
    e.preventDefault()

    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    }

    let valueToSendAPI = {
      valor: parseInt(valor),
      descricao
    }
    if (parseInt(valor) < 1) {
      alert(`Valor inválido`)
      return
    }
    if (descricao == "") {
      alert(`Descrição é um campo obrigatório`)
      return
    }
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`, valueToSendAPI, config)
    promise.then(res => {
      navigate("/home")
    })
    promise.catch((res) => {
      alert(`${res.response.data}`)
    })
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form>
        <input
          placeholder="Valor"
          type="number"
          value={valor}
          onChange={e => setValor(e.target.value)}
          required
        />
        <input
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
        />
        <button onClick={saveNewTransac}>Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
