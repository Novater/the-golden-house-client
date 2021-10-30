import { Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

export default class createFunctions {
  static createModal = (title, content, showState, saveFunc, closeFunc) => {
    return (
      <Modal show={showState} onHide={closeFunc}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={closeFunc}>
            Cancel
          </button>
          <button className='btn btn-primary' onClick={saveFunc}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}