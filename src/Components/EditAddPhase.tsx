import React, { useState, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Space } from "antd";
import Menu from "./Menu";
import Navbar from "./Navbar";
import EmployeeTable from "./EmployeeTable";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalInfo } from "../App";

interface Phase {
  phaseName: string;
  // ProID: string | number;
  // clientName: string;
  // projectName: string;
  // projectDescription: string;
}

interface Project {
  ProID: string | number;
  clientName: string;
  projectName: string;
  projectDescription: string;
}

interface Phases {
  phaseID: number;
  projectName: string;
  phases: string;
}

const EditAddPhase: React.FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [phases, setPhases] = useState<any>("");
  const [data, setData] = useState<any[]>([]);
  const [phaseArr, setphaseArr] = useState<Phases[]>([]);

  const navigate = useNavigate();

  const { phasejEditObj, setPhasejEditObj } = useContext(GlobalInfo);

  // console.log(phasejEditObj, "ggjjjjkkk8888888888---");

  useEffect(() => {
    if (phasejEditObj) {
      setPhases(phasejEditObj.phases);
      setProjectName(phasejEditObj.projectName);
    }
  }, [phasejEditObj]);

  const projectNames = data.map((e) => {
    return e.projectName;
  });

  console.log(projectNames, "00---");

  const handleClientNameChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProjectName(event.target.value);
  };

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:5000/get/projects")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleSubmit = () => {
    if (!phasejEditObj?.phaseID) {
      alert("you can not edit directly from here");
    } else {
      if (projectName === "" || phases === "") {
        alert("please fill all credentials");
        return;
      }
      const data = {
        projectName: projectName,
        phases: phases,
      };

      axios
        .put(
          `http://localhost:5000/update/phase/${phasejEditObj.phaseID}`,
          data
        )
        .then((response) => {
          console.log(response, "999");
          if (response.data === "OK") {
            navigate("/view-phase");
            alert(" phase updated successfully");
          }
        })
        .catch((error) => {
          console.log(error, "8888");
          if (error.response && error.response.status === 400) {
            alert(error.response.data);
          } else {
            alert("An error occurred while submitting the form");
          }
        });
    }
  };


  return (
    <div className="emp-main-div">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ height: "8%" }}>
          <Navbar />
        </div>
        <div style={{ display: "flex", flexDirection: "row", height: "90%" }}>
          <div className="menu-div">
            <Menu />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="form-container"
          >
            <div className="add-div">
              <p className="add-heading">Edit Phase</p>
              <label className="add-label">
                Project<span style={{ color: "red" }}>*</span>{" "}
              </label>
              <select
                className="add-input"
                value={projectName}
                onChange={handleClientNameChange}
              >
                <option value="">Select a project</option>
                {projectNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <div style={{ marginTop: "10px" }}>
                <label className="add-label">
                  Phase Name
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div style={{ display: "flex" }}>
                  <input
                    className="add-input"
                    value={phases}
                    onChange={(e) => setPhases(e.target.value)}
                  />
                </div>
              </div>

              <button className="add-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div style={{ width: "90%", height: "80%", marginTop: "3%" }}>
              <div>{/* <EmployeeTable  /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAddPhase;
