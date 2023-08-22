import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import publicApi from "../api/publicApi";
import EditIcon from "@mui/icons-material/Edit";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import DeleteIcon from "@mui/icons-material/Delete";

const EditProductModal = ({
  id,
  productData,
  setProductData,
  showEdit,
  setShowEdit,
  updateProduct,
}) => {
  const [categoriez, setCategoriez] = useState([]);

  const getCategory = async () => {
    const { data } = await publicApi.get("/category/get");
    setCategoriez(data.data);
    console.log(data)
  };

  const getProduct = async () => {
    const { data } = await publicApi.get(`/products/getone/${id}`);
    console.log(data);
    setProductData(data.data);
  };

  const handleClose = () => setShowEdit(false);
  const handleShow = () => setShowEdit(true);
  const saveFiles = (e) => {
    let imgArr = [];
    let images = e.target.files;
    for (let i = 0; i < images.length; i++) {
      imgArr = [...imgArr, images[i]];
    }

    setProductData({ ...productData, images: imgArr });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <EditIcon
        onClick={() => {
          
          getProduct();
          handleShow();
        }}
      />

      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateProduct}>
            <Row className="mb-3">
              <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="book"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                />
              </Col>
              <Col>
                <Form.Label>Buying Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1000"
                  value={productData.buyingPrice}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      buyingPrice: e.target.value,
                    })
                  }
                />
              </Col>

            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1500"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                />
              </Col>
              <Col>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="100"
                  value={productData.stock}
                  onChange={(e) =>
                    setProductData({ ...productData, stock: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    category: [...productData.category, e.target.value],
                  })
                }
              >
                { 
                // console.log(categoriez)

                categoriez.map((categ) => {
                  return <option>{categ.name}</option>;
                })
                }
                {/* fetch categories from db */}
              </Form.Select>
              <div>
                {" "}
                {productData.category.map((categ) => {
                  return <p className="categoryListItem">{categ + " "}</p>;
                })}
                {productData.category.length > 0 ? (
                  <DeleteIcon
                    onClick={() =>
                      setProductData({ ...productData, category: [] })
                    }
                  />
                ) : null}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <button className="admin-btn-full btnAdmin">Edit Product</button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProductModal;
