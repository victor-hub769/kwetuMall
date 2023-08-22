import React ,{ useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import publicApi from '../api/publicApi'

const AddCategoryModal = ({showAdd,
    setShowAdd,categoryData,setCategoryData,createCategory}) => {




  const handleClose = () => setShowAdd(false);
  const handleShow = () => setShowAdd(true);

  return (
    <>
      <Button className="btnAdmin" variant="primary" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={showAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={createCategory}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
                value={categoryData.name}
                onChange={(e) => setCategoryData({ name: e.target.value })}
              />
            </Form.Group>
            <button className="btnAdmin  admin-btn-full">Add Category</button>
          </Form>{" "}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
