import { Modal } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
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

  static createBackdrop(image) {
    if (!image) return null
    return (
      <LazyLoadImage
        src={image.default}
        className="banner-img"
        effect="opacity"
        alt="banner"
      />
    )
  }
}
