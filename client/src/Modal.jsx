import ReactDOM from 'react-dom';

function Modal({ children }) {
  let modalContainer = document.getElementById('modal-container');
  if (modalContainer === null) {
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-container');
    document.body.append(modalContainer);
  }

  return ReactDOM.createPortal(children, modalContainer);
}

export default Modal;
