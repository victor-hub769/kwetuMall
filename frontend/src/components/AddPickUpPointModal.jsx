import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PickUpPoints from "../admin/PickUpPoints";

function AddPickUpPointModal({ pickUpPointsData, setPickUpPointsData,createPickUpPoint }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btnAdmin">
        Add PickUp Point
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add PickUp Point</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createPickUpPoint}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                placeholder="Enter Location"
                type="text"
                value={pickUpPointsData.location}
                onChange={(e) =>
                  setPickUpPointsData({
                    ...pickUpPointsData,
                    location: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Name"
                value={pickUpPointsData.name}
                onChange={(e) =>
                  setPickUpPointsData({
                    ...pickUpPointsData,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <button className="btnAdmin admin-btn-full">Add PickUp Point</button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddPickUpPointModal;
