import './style.css'
import Trash from '../../assets/trash-svgrepo-com.svg'
import Edit from '../../assets/edit-svgrepo-com.svg'
import Open from '../../assets/open-in-new-window-button-1-svgrepo-com.svg'
import { useEffect, useState } from 'react';
import api from '../../services/api'

// apenas useState pode mudar coisas da tela
// useState eh um hook, que eh uma ferramenta de suporte
// pegar .data da resposta da api

function Home() {

    const a = 1;
    
    const [projects, setProjects] = useState([]);

    async function getProjects() {
        try {
            // const response = await api.get("/projects");
            setProjects(response.data);
        } catch(e) {

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

                {projects.map(project => (
                    <div key={project.id}>
                        <div>
                            <p>Nome: {project.name}</p>
                            <p>Data de início: {project.startDate}</p>
                            <p>Data de fim: {project.endDate}</p>
                        </div>
                        <button onClick={() => deleteProject(project.id)}>
                            <img src={Trash} />
                        </button>
                        <button>
                            <img src={a} />
                        </button>
                        <button>
                            <img src={a} />
                        </button>
                    </div>
                ))}

            </div>
        </>
    )
}

export default Home
