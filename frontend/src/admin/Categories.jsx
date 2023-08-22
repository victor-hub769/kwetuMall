import React, { useState, useEffect } from "react";
import Sidenav from "./SideNav";
import Table from "react-bootstrap/Table";
import publicApi from "../api/publicApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCategoryModal from "../components/AddCategoryModal.jsx";
import EditCategoryModal from "../components/EditCategoryModal.jsx";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data } = await publicApi.get("/category/get");
    setCategories(data.data);
    console.log(data.data);
  };

  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  const createCategory = async (e) => {
    e.preventDefault();
    const { data } = await publicApi.post("/category/create", categoryData);
    console.log(data);
    if (data.message === "Category Created Succesfully") {
      setCategories([...categories, data.data]);
      setShowAdd(false);
    }
  };

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const updateCategory = async (e) => {
    e.preventDefault();
    const { data } = await publicApi.post(
      `/category/update/${categoryData._id}`,
      categoryData
    );
    console.log(data);
    if (data.message === "Updated Category Successfully") {
      let editedCategories = categories.map((category) => {
        if (category._id === categoryData._id) {
          return data.data;
        } else {
          return category;
        }
      });

      setCategories(editedCategories);
      setShowEdit(false);
    }
  };

  const deleteCategory = async (id) => {
    const { data } = await publicApi.post(`/category/delete/${id}`);
    console.log(data);
    if (data.message === "Deleted succesfully") {
      const newCategories = categories.filter((category) => {
        return category._id !== id;
      });
      setCategories(newCategories);
    }
  };

  return (
    <div className="content">
      <h1>Categories</h1>

      <Sidenav />
      <AddCategoryModal
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
        createCategory={createCategory}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            return (
              <tr key={category._id}>
                <td>{category._id}</td>

                <td>{category.name}</td>
                <td>
                  {" "}
                  <EditCategoryModal
                    id={category._id}
                    updateCategory={updateCategory}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                    showEdit={showEdit}
                    setShowEdit={setShowEdit}
                  />
                  <DeleteIcon onClick={() => deleteCategory(category._id)} />{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Categories;
