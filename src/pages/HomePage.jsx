import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import DataContextProvider from "../context/DataContextProvider"


export default function HomePage() {
  const [name, setName] = useState("")
  const [total, setTotal] = useState(0)
  const [transacs, setTransacs] = useState([])
  const { token } = useContext(DataContextProvider)
  const navigate = useNavigate()

  function verificarTokenDeAcesso() {
    if (!token) {
      navigate("/")
    }
  }

  useEffect(() => {
    verificarTokenDeAcesso()
    getTransacList()
    getUsername()
  }, [])

  const header = {
    headers: { "Authorization": `Bearer ${token}` }
  }

  function getUsername() {
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/sign-in`, header)
    promise.then((res) => {
      setName(res.data.name)
      console.log(res.data)
    })
    promise.catch((err) => {
      if (err.response.status === 401) {
        navigate("/")
      }
    })
  }

  function getTransacList() {
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/transacoes`, header)
    promise.then((res) => {
      setTransacs(res.data.transacs)
      setTotal(res.data.total)
      console.log(res.data)
    })
    promise.catch((err) => {
      if (err.response.status === 401) {
        navigate("/")
      }
    })
  }

  function renderValor(valor) {
    if (valor < 0) {
      return (valor * -1).toFixed(2).replace(".", ",")
    }
    return valor.toFixed(2).replace(".", ",")

  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transacs.map((transaction) => {
            return (
              <ListItemContainer key={transaction._id}>
                <div data-test="registry-name">
                  <span>{transaction.date}</span>
                  <strong>{transaction.descricao}</strong>
                </div>
                <Value data-test="registry-amount" color={transaction.valor < 0 ? "negativo" : "positivo"}>{renderValor(transaction.valor)}</Value>
              </ListItemContainer>
            )

          })}

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={total < 0 ? "negativo" : "positivo"}>{renderValor(total)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button data-test="new-income">
          <Link to={"/nova-transacao/entrada"}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </Link>
        </button>
        <button data-test="new-expense">
          <Link to={"/nova-transacao/saida"}>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </Link>
        </button>

      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul{
    height: calc(100vh - 115px - 46px - 18px - 15px - 32px - 75px);
    overflow-y: auto;
  }
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`