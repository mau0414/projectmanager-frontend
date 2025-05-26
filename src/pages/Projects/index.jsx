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
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState(null);

    function handleExit() {
        logout();
        navigation("/");
    }

    function handleOpenCreateModal() {
        setIsCreateModalOpen(true);
    }

    function handleCloseCreateModal() {
        setIsCreateModalOpen(false);
    }

    function handleOpenEditModal(project) {
        setIsEditModalOpen(true);
        setProjectToEdit(project);
    }

    function handleCloseEditModal() {
        setIsEditModalOpen(false);
        setProjectToEdit(null);
    }

    async function handleCreate() {

        try {

            const response = await api.post("/projects", {
                title: titleRef.current.value,
                startDate: startDateRef.current.value,
                endDate: endDateRef.current.value,
                description: descriptionRef.current.value
            })
            
            setProjects(response.data.projects);
            setIsCreateModalOpen(false);

        } catch(e) {
            console.log(e);
        }

    }

    async function handleDelete(id) {

        try {
            const response = await api.delete(`/projects/${id}`);
            setProjects(response.data.projects);
        } catch(e) {
            console.log(e);
        }

    }

    async function handleEdit() {

        const id = projectToEdit.id;

        try {
            const response = await api.put(`/projects/${id}`, {
                title: titleRef.current.value,
                startDate: startDateRef.current.value,
                endDate: endDateRef.current.value,
                description: descriptionRef.current.value
            });
            setProjects(response.data.projects);
            handleCloseEditModal();
        } catch(e) {
            console.log(e);
        }

    }

    function handleOpenProject(id) {
        navigation(`/projects/${id}`);
    }



    async function getProjects() {
        try {
            const response = await api.get("/projects");
            setProjects(response.data.projects);
        } catch (e) {
            console.log(e);

        }
    }

    useEffect(() => {

        getProjects();

    }, [])

    useEffect(() => {

        if (projectToEdit) {
            titleRef.current.value = projectToEdit.title || '';
            startDateRef.current.value = projectToEdit.startDate || '';
            endDateRef.current.value = projectToEdit.endDate || '';
            descriptionRef.current.value = projectToEdit.description || '';
        }

    }, [projectToEdit])

    return (


        <>
            <div className='container'>
                <div className="actions">
                    <button onClick={handleOpenCreateModal}>Criar projeto</button>
                    <button onClick={handleExit}>Sair</button>
                </div>

                {projects.map(project => (
                    <div key={project.id} className="project">
                        <div className="project-info">
                            <h2>{project.title}</h2>
                            <p><strong>Data de início:</strong> {project.startDate}</p>
                            <p><strong>Data de fim:</strong> {project.endDate}</p>
                            <p><strong>Descrição:</strong> {project.description}</p>
                        </div>
                        <div className="project-buttons">
                            <button onClick={() => handleDelete(project.id)}>
                                <img src={Trash} alt="Excluir" />
                            </button>
                            <button onClick={() => handleOpenEditModal(project)}>
                                <img src={Edit} alt="Editar" />
                            </button>
                            <button onClick={() => handleOpenProject(project.id)}>
                                <img src={Open} alt="Abrir" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal}>
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

            <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
                <h2>Edite seu projeto</h2>
                <h4>Título</h4>
                <input name='title' type='text' required ref={titleRef} />
                <h4>Data de início</h4>
                <input name='startDate' type='date' ref={startDateRef} />
                <h4>Data de fim</h4>
                <input name='endDate' type='date' ref={endDateRef} />
                <h4>Descrição</h4>
                <textarea name='description' ref={descriptionRef}></textarea>
                <button type='button' onClick={handleEdit}>Editar</button>
            </Modal>

        </>
    )
}

export default Home
