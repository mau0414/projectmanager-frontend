import './style.css'
import Trash from '../../assets/trash-svgrepo-com.svg'
import Edit from '../../assets/edit-svgrepo-com.svg'
import ArrowBack from '../../assets/arrow-left-svgrepo-com.svg'
import { useEffect, useState, useRef } from 'react';
import api from '../../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../../components/Modal';

function TaskPage() {

    const navigation = useNavigate();
    const { logout } = useAuth();
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const titleRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const descriptionRef = useRef();

    async function getTasks() {
        console.log("entrou aqui!")
        try {

            const response = await api.get("/tasks", {
                params: {
                    projectId: id
                }
            });
            console.log("aqui as tasks", response.data.tasks);
            setTasks(response.data.tasks);

        } catch (e) {
            console.log(e);

        }
    }

    async function handleDelete(id) {

        try {
            const response = await api.delete(`/tasks/${id}`);
            setTasks(response.data.tasks);
        } catch(e) {
            console.log(e);
        }

    }

    function handleOpenCreateModal() {
        setIsCreateModalOpen(true);
    }

    function handleCloseCreateModal() {
        setIsCreateModalOpen(false);
    }


    async function handleOpenEditModal(a) {
        console.log("opa abriu!")
    }

    async function handleMoveTask(taskId, newStatus) {

        try {
            const response = await api.put(`/tasks/${taskId}`, {
                newStatus: newStatus
            });

            setTasks(response.data.tasks);

        } catch (e) {
            console.log(e);
        }
    }

    async function handleCreate() {

        try {

            const response = await api.post("/tasks", {
                title: titleRef.current.value,
                startDate: startDateRef.current.value,
                endDate: endDateRef.current.value,
                description: descriptionRef.current.value,
                projectId: id
            })

            setTasks(response.data.tasks);
            setIsCreateModalOpen(false);

        } catch (e) {
            console.log(e);
        }

    }

    function handleGoBack() {
        navigation("/projects");
    }

    function handleExit() {
        logout();
        navigation("/");
    }


    useEffect(() => {

        getTasks();

    }, [])

    const renderTasks = (status) => (
        tasks
            .filter(task => task.status === status)
            .map(task => (
                <div key={task.id} className="task">
                    <div className="task-info">
                        <p>Nome: {task.title}</p>
                        <p>Data de início: {task.startDate}</p>
                        <p>Data de fim: {task.endDate}</p>
                        <p>Descrição: {task.description}</p>
                    </div>
                    <div className="task-buttons">
                        <button onClick={() => handleDelete(task.id)} className='delete-button'>
                            <img src={Trash} alt="Excluir" />
                        </button>
                        <button className='edit-button'>
                            <img src={Edit} alt="Editar" />
                        </button>
                        {status === 'TODO' && (
                            <button onClick={() => handleMoveTask(task.id, "INPROGRESS")} className='move-button'>
                                Mover para Progresso
                            </button>
                        )}

                        {status === 'INPROGRESS' && (
                            <button onClick={() => handleMoveTask(task.id, "DONE")} className='move-button'>
                                Mover para Finalizado
                            </button>
                        )}
                    </div>
                </div>
            ))
    );


    return (


        <>
            <div className='container'>

                <div className='button-row'>
                    <button onClick={handleGoBack} className="back-button">
                        <img src={ArrowBack} />
                    </button>

                    <div className="actions">
                        <button onClick={handleOpenCreateModal}>Criar tarefa</button>
                        <button onClick={handleExit}>Sair</button>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <h2>To-do</h2>
                        {renderTasks('TODO')}
                    </div>

                    <div className="column">
                        <h2>Em Progresso</h2>
                        {renderTasks('INPROGRESS')}
                    </div>

                    <div className="column">
                        <h2>Finalizado</h2>
                        {renderTasks('DONE')}
                    </div>
                </div>
            </div>

            <Modal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal}>
                <h2>Criar nova tarefa</h2>
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

            {/* <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
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
            </Modal> */}

        </>
    )
}

export default TaskPage
