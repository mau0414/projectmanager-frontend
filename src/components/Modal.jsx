import './style.css';
import Close from '../assets/close.svg'

function Modal({ isOpen, onClose, children }) {

    console.log("entrou no modal")

    if (!isOpen) return null;

    console.log("ue")

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className='close-button'>
                    <img src={Close} />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
