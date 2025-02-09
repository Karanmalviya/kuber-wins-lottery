import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
const CustomModalAlert = ({
  show,
  handleClose,
  modalTitle,
  modalBody,
  primaryButtonText,
  secondaryButtonText,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        style={{ zIndex: 99999 }}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="OTP-modal">
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        {/* <Modal.Footer> */}
        <div
        // className="d-flex justify-content-end"
        // style={{ marginTop: "-20px" }}
        >
          <div className="p-2">
            <div className="d-flex justify-content-center">
              {primaryButtonText ? (
                <>
                  <Button
                    className="btn btn-primary px-3 btn-sm w-50 me-2"
                    variant="primary"
                    onClick={() => {
                      navigate(link);
                      handleClose();
                    }}
                  >
                    {primaryButtonText}
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={handleClose}
                    className="btn btn-primary px-3 btn-sm w-50 "
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" size="sm" onClick={handleClose}>
                    Okay
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default CustomModalAlert;
