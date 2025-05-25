import './style.css'
import Trash from '../../assets/trash-svgrepo-com.svg'
import Edit from '../../assets/edit-svgrepo-com.svg'
import Open from '../../assets/open-in-new-window-button-1-svgrepo-com.svg'
import { useEffect, useState, useRef } from 'react';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../../components/Modal';

// apenas useState pode mudar coisas da tela
// useState eh um hook, que eh uma ferramenta de suporte
// pegar .data da resposta da api

function Home() {

    const a = 1;
    const navigation = useNavigate();
    const { logout } = useAuth();

    const titleRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const descriptionRef = useRef();

    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleExit() {
        logout();
        navigation("/");
    }

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    async function handleCreate() {


        try {

            const response = await api.post("/projects", {
                title: titleRef.current.value,
                startDate: startDateRef.current.value,
                endDate: endDateRef.current.value,
                description: descriptionRef.current.value
            })

            console.log("recebeu resposta vazia e deu erro ", response.data)
            
            setProjects(response.data.projects);
            setIsModalOpen(false);

        } catch(e) {
            console.log(e);
        }

    }



    async function getProjects() {
        try {
            console.log("get!")
            const response = await api.get("/projects");
            console.log("repsonse = ", response.data.projects)
            setProjects(response.data.projects);
        } catch (e) {
            console.log(e);

        }
    }

    async function deleteProject(id) {
        // await api.delete(`/projects/${id}`);

        getProjects();
    }

    useEffect(() => {

        getProjects();
        // setProjects([{
        //     name: "mauricio",
        //     startDate: "a",
        //     endDate: "b"
        // }])

    }, [])

    return (


        <>
            <div className='container'>
                <div className="actions">
                    <button onClick={handleOpenModal}>Criar projeto</button>
                    <button onClick={handleExit}>Sair</button>
                </div>

                {projects.map(project => (
                    <div key={project.id} className="project">
                        <div className="project-info">
                            <p>Nome: {project.title}</p>
                            <p>Data de início: {project.startDate}</p>
                            <p>Data de fim: {project.endDate}</p>
                            <p>Descrição: {project.description}</p>
                        </div>
                        <div className="project-buttons">
                            <button onClick={() => deleteProject(project.id)}>
                                <img src={Trash} alt="Excluir" />
                            </button>
                            <button>
                                <img src={Edit} alt="Editar" />
                            </button>
                            <button>
                                <img src={Open} alt="Abrir" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>Criar novo projeto</h2>
                <h4>Título</h4>
                <input name='title' type='text' required ref={titleRef} />
                <h4>Data de início</h4>
                <input name='startDate' type='date' ref={startDateRef} />
                <h4>Data de fim</h4>
                <input name='endDate' type='date' ref={endDateRef} />
                <h4>Descrição</h4>
                <textarea name='description' ref={descriptionRef}></textarea>
                <button type='button' onClick={handleCreate}>Criar</button>
            </Modal>

        </>
    )
}

export default Home
