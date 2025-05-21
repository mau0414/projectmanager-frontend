import './style.css'
import api from '../../services/api'
import { useRef } from 'react'

function Home() {

  const nameRef = useRef();

  async function exemplo() {

    const a = await api.get("/")
  }

  async function login() {

    console.log(nameRef);
    await api.post("/login", {
      name: nameRef.current.value()
    });

    // chamar proxima pagina
  }

  return (
    <>
      <div className='container'>
        <form>
          <h1>Faça login</h1>
          <input name='name' type='text' ref={nameRef}/>
          <button type='button' onClick={login}>Entrar</button>
        </form>
        <button>
          
        </button>
      </div>
    </>
  )
}

export default Home
