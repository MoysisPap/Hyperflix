import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import Modal from 'react-modal';

const Trailer = ({videoKey}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return videoKey ? (
    <div>
      <button className="btn-outline flex justify-center items-center gap-1" onClick={openModal}><FaPlay /> Watch Trailer</button>
      <Modal 
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            background: '#fff',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Trailer" 
        shouldCloseOnEsc={true}
      >
        <div>
          <div>
            <iframe allow="autoplay" className=" w-full h-[470px]" src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`} allowFullScreen=''></iframe>
          </div>
        </div>
      </Modal>
    </div>
  ): null
}

export default Trailer;