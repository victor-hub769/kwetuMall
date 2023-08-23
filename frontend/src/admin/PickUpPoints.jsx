import React, { useEffect, useState } from "react";
import Sidenav from "./SideNav";
import Table from "react-bootstrap/Table";
import publicApi from "../api/publicApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPickUpPointModal from "../components/AddPickUpPointModal";

const PickUpPoints = () => {
  const [pickUpPointsData, setPickUpPointsData] = useState({
    location: "",
    name: "",
  });
  const [pickUpPoints, setPickUpPoints] = useState([]);
  const getPickUpPoints = async () => {
    const { data } = await publicApi.get("/pickUpPoint/get");
    console.log(data);
    setPickUpPoints(data.data);
  };

  const createPickUpPoint = async (e) => {
    e.preventDefault()
    const { data } = await publicApi.post(
      "/pickUpPoint/create",
      pickUpPointsData
    );
    console.log(data);
    if (data.message === "PickUpPoint Created Succesfully") {
        setPickUpPoints([...pickUpPoints, data.data]);
        setShowAdd(false);
      }
  };

  useEffect(() => {
    getPickUpPoints();
  }, []);
  return (
    <>
      <div>
        <Sidenav />
        <div className="content">
          <h1>Pickup Points</h1>
          <AddPickUpPointModal
            pickUpPointsData={pickUpPointsData}
            setPickUpPointsData={setPickUpPointsData}
            createPickUpPoint={createPickUpPoint}
          />
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th> Name</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pickUpPoints.map((pickUpPoint) => {
                return (
                  <tr>
                    <td>{pickUpPoint._id}</td>
                    <td>{pickUpPoint.location}</td>
                    <td>{pickUpPoint.name}</td>
                    <td>
                      <EditIcon />
                      <DeleteIcon />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default PickUpPoints;
