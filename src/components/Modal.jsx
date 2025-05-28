import './style.css';
import Close from '../assets/close.svg'

function Modal({ isOpen, onClose, children }) {

    if (!isOpen) return null;

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
