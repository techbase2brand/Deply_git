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
  // projectName: string;
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
  // costBefore: number;
  // costAfter: number;
  // estTime: number;
  // actTime: number;
}

interface Phases {
  phaseID: number;
  projectName: string;
  phases: string[];
}

const data: Phases[] = [
  {
    phaseID: 0,
    projectName: "",
    phases: ["", ""],
  },
];

const AddPhase: React.FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [phases, setPhases] = useState<Phase[]>([{ phaseName: "" }]);
  const [data, setData] = useState<any[]>([]);
  const [phaseArr, setphaseArr] = useState<Phases[]>([]);

  const navigate = useNavigate();

  console.log(projectName, "projectName");
  console.log(phases, "phases");
  console.log(data, "data");
  console.log(phaseArr, "phaseArr");

  const { phasejEditObj, setPhasejEditObj } = useContext(GlobalInfo);

  console.log(phasejEditObj, "ggjjjjkkk---");

  useEffect(() => {
    if (phasejEditObj) {
      console.log("fffggggg---");
      console.log(phasejEditObj.projectName, "jjjjjjj----ggg");

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

  const handlePhaseNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setPhases((prevState) => {
      const newState = [...prevState];
      newState[index].phaseName = value;
      return newState;
    });
  };

  const handleSubmit = () => {
    // Check if projectName and all phases are filled
    if (!projectName || !phases.every((phase) => phase.phaseName)) {
      alert("Please fill all credentials");
      return;
    }

    // Check if there are any duplicate phases for the same projectName
    const duplicates = phases.filter(
      (phase, index) =>
        phases.findIndex((p) => p.phaseName === phase.phaseName) !== index
    );
    if (duplicates.length > 0) {
      alert("Duplicate phases are not allowed for the same project");
      return;
    }

    // Prepare the data to be sent to the server
    const data = {
      projectName,
      phases: phases.map((phase) => phase.phaseName),
    };

    axios
      .post("http://localhost:5000/api/add-phase", data)
      .then((response) => {
        if (response.status === 400) {
          console.log(response.data,"jjjj---");
          alert(response.data);
        } else if (response.status === 200 && response.data === "OK") {
          navigate("/view-phase");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Data Already exists");
      });

    console.log("Form submitted with data:", data);
  };


  const handleAddPhase = () => {
    setPhases((prevState) => [...prevState, { phaseName: "" }]);
  };

  const handleRemovePhase = (index: number) => {
    setPhases((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
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
              <p className="add-heading">Add Phase</p>
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

              {phases.map((phase, index) => (
                <div key={index} style={{ marginTop: "10px" }}>
                  <label className="add-label">
                    Phase {index + 1} Name
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div style={{ display: "flex" }}>
                    <input
                      className="add-input"
                      value={phase.phaseName}
                      onChange={(e) => handlePhaseNameChange(e, index)}
                    />
                    {index !== 0 && (
                      <div
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          marginTop: "16px",
                        }}
                        onClick={() => handleRemovePhase(index)}
                      >
                        <MinusCircleOutlined />
                      </div>
                    )}
                    {index === phases.length - 1 && (
                      <div
                        style={{
                          marginLeft: "5px",
                          cursor: "pointer",
                          marginTop: "16px",
                        }}
                        onClick={handleAddPhase}
                      >
                        <PlusCircleOutlined />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button className="add-button" onClick={handleSubmit}>
                Add Phase
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

export default AddPhase;
