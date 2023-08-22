import  React,{ useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import publicApi from "../api/publicApi";
import DeleteIcon from "@mui/icons-material/Delete";

const AddProductModal = ({createProduct, productData, setProductData , show, setShow}) => {



  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    const { data } = await publicApi.get("/category/get");
    setCategory(data.data);
  };

  useEffect(() => {
    getCategory();
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const saveFiles = (e) => {
    let imgArr = [];
    let images = e.target.files;
    for (let i = 0; i < images.length; i++) {
      imgArr = [...imgArr, images[i]];
    }

    setProductData({ ...productData, images: imgArr });
  };



  return (
    <>
      <button className="btnAdmin" onClick={handleShow}>
        Add Products
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createProduct}>
            <Row className="mb-3">
              <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="book"
                  value={[productData.name]}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                />
              </Col>
              <Col>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setProductData({ ...productData, Image: e.target.files[0] })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Images</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => saveFiles(e)}
                />
              </Col>
              <Col>
                <Form.Label>Buying Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1000"
                  value={[productData.buyingPrice]}
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
                  value={[productData.stock]}
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
                {category.map((categories) => {
                  return <option>{categories.name}</option>;
                })}
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
                value={[productData.description]}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <button className="admin-btn-full btnAdmin">Add Product</button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductModal;
