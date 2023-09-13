import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";

import { modalActions } from "../../../store/modalStore";

const CustomModal = (props) => {
  // redux
  const dispatch = useDispatch();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
