import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import EditIcon from "@mui/icons-material/Edit";
import publicApi from "../api/publicApi";

function EditPickUpPoints({
  updatePickUpPoints,
  pickUpPointsData,
  setPickUpPointsData,
  id,
  showEdit,
  setShowEdit,
}) {
  const handleClose = () => {
    setShowEdit(false);
  };
  const handleShow = () => {
    setShowEdit(true);
  };

  const getPickUpPoint = async () => {
    const { data } = await publicApi.get(`/pickUpPoint/getone/${id}`);
    console.log(data);
    setPickUpPointsData(data.data);
  };

  return (
    <>
      <EditIcon
        onClick={() => {
          handleShow();
          getPickUpPoint();
        }}
      />

      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Edit pick up points</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={updatePickUpPoints}>
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
            <button className="btnAdmin admin-btn-full">
              Add PickUp Point
            </button>
          </Form>{" "}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPickUpPoints;
