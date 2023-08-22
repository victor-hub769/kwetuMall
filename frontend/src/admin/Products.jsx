import React, { useEffect, useState } from "react";
import SideNav from "./SideNav.jsx";
import publicApi from "../api/publicApi.js";
import Table from "react-bootstrap/Table";
import instance from "../api/publicApi.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "react-bootstrap/Modal";
import AddProductModal from "../components/AddProductModal.jsx";
import EditProductModal from "../components/EditProductModal.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const getProducts = async () => {
    const { data } = await publicApi.get("/products");
    setProducts(data.data);
  };

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    buyingPrice: "",
    Image: "",
    images: [],
    category: [],
    stock: "",
  });

  const createProduct = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", productData.name);
    formData.append("image", productData.Image);
    for (let i = 0; i < productData.images.length; i++) {
      formData.append("images", productData.images[i]);
    }
    for (let i = 0; i < productData.category.length; i++) {
      formData.append("category", productData.category[i]);
    }
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("buyingPrice", productData.buyingPrice);
    formData.append("stock", productData.stock);

    const { data } = await publicApi.post("/products/create", formData);
    console.log(data);
    if (data.message === "Product created succesfully") {
      setProducts([...products, data.data]);
      setShow(false);
    }
  };

  const updateProduct = async(e)=>{
    e.preventDefault();
    const {data} = await publicApi.post(`/products/update/${productData._id}`, productData)
    console.log(data)
    if (data.message === 'Product updated successfully'){
      let editedProducts = products.map((product)=>{
        if(product._id === productData._id){
          return data.data
        }else{
          return product
        }
      })

      setProducts(editedProducts)
      setShowEdit(false)
    }
  }

  const deleteProduct = async (id) => {
    const { data } = await publicApi.post(`/products/delete/${id}`);
    console.log(data);
    if (data.message === "Deleted product successfully") {
      const newProducts = products.filter((product) => {
        return product._id !== id;
      });
      setProducts(newProducts);
    }
  };



  
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <SideNav />
      <div className="content">
        <h1>Products</h1>
        <AddProductModal
          createProduct={createProduct}
          productData={productData}
          setProductData={setProductData}
          show={show}
          setShow={setShow}
        />

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Buying price</th>
              <th>Selling price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <img
                      className="thumbNail"
                      src={backendUrl + product.image}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.buyingPrice}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <EditProductModal
                      updateProduct={updateProduct}
                      productData={productData}
                      setProductData={setProductData}
                      showEdit={showEdit}
                      setShowEdit={setShowEdit}
                      id={product._id}
                    />{" "}
                    <DeleteIcon onClick={() => deleteProduct(product._id)} />{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Products;
