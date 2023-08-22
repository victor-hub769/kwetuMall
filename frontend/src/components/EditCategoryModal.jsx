import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import publicApi from "../api/publicApi";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const EditCategoryModal = ({ id , categoryData,setCategoryData,showEdit,setShowEdit,updateCategory }) => {
  


  const handleClose = () => setShowEdit(false);
  const handleShow = () => setShowEdit(true);

  const getCategory = async () => {
    const { data } = await publicApi.get(`/category/getone/${id}`);
    console.log(data);
    setCategoryData(data.data);
  };


  return (
    <>
      <EditIcon
        onClick={() => {
          getCategory();
          handleShow();
        }}
      />
      <Modal show={showEdit} onHide={handleClose}>
        {" "}
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateCategory}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit Category Name"
                value={categoryData.name}
                onChange={(e)=> setCategoryData({...categoryData, name:e.target.value})}
              />
            </Form.Group>
            <button className="btnAdmin  admin-btn-full">Edit Category</button>
          </Form>{" "}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditCategoryModal;
