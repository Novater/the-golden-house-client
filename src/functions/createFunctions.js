import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

export default class createFunctions {
  static createModal(title, content, showState, saveFunc, closeFunc) {
    return (
      <Modal show={showState} onHide={closeFunc}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={closeFunc}
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="button" onClick={saveFunc}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}
