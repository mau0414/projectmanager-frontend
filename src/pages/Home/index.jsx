import './style.css'
import api from '../../services/api'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

function Home() {

  const navigation = useNavigate();
  const { login } = useAuth();

  const nameRef = useRef();

  async function handleLogin() {

    try {

      const response = await api.post("/auth/login", {
        username: nameRef.current.value
      });

      login(response.data.token);
      navigation('/projects');

    } catch(e) {
      console.log(e)
    }

  }

  return (
    <>
      <div className='container'>
        <form>
          <h1>Faça login</h1>
          <input name='name' type='text' ref={nameRef}/>
          <button type='button' onClick={handleLogin}>Entrar</button>
        </form>
        <button>
          
        </button>
      </div>
    </>
  )
}

export default Home
