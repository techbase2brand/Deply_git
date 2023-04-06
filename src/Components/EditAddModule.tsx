import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Space } from "antd";
import Menu from "./Menu";
import Navbar from "./Navbar";
import EmployeeTable from "./EmployeeTable";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalInfo } from "../App";

interface Module {
  projectName: string;
  phaseName: string;
  modules: string[];
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
  phases: string[];
}


const EditAddModule: React.FC<any> = ({ navigation, classes }) => {
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [phases, setPhases] = useState<Phases[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedPhase, setSelectedPhase] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<string>("");

 

  const navigate = useNavigate();

  const { modulejEditObj, setModulejEditObj } = useContext(GlobalInfo);

  console.log(modulejEditObj, "jjjgggff");

  useEffect(() => {
    if (modulejEditObj) {
      setSelectedProject(modulejEditObj?.projectName);
      setSelectedPhase(modulejEditObj?.phaseName);
      setSelectedModule(modulejEditObj?.modules);
    }
  }, [modulejEditObj]);

  console.log(selectedProject);
  console.log(selectedPhase);
  console.log(selectedModule);

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:5000/get/projects")
      .then((response) => {
        setProjectNames(response.data.map((project) => project.projectName));
      });
  }, []);

  useEffect(() => {
    axios.get<Phases[]>("http://localhost:5000/get/phases").then((response) => {
      setPhases(response.data);
    });
  }, []);

  const handleModuleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedModule(e.target.value);
  };

  //   const handleAddModule = () => {
  //     setModule({
  //       ...module,
  //       modules: [...module.modules, ""],
  //     });
  //   };

  //   const handleRemoveModule = (index: number) => {
  //     const updatedModules = [...module.modules];
  //     updatedModules.splice(index, 1);
  //     setModule({
  //       ...module,
  //       modules: updatedModules,
  //     });
  //   };

  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
    // const currentPhase = phases.find((phase) => phase.projectName === value);
    // if (currentPhase) {
    //   setSelectedPhase(currentPhase.phases[0]);
    //   setModule({
    //     projectName: value,
    //     phaseName: currentPhase.phases[0],
    //     modules: ["", ""],
    //   });
    // } else {
    //   setSelectedPhase("");
    //   setModule({

    //     projectName: value,
    //     phaseName: "",
    //     modules: ["", ""],
    //   });
    // }
  };

  const handlePhaseChange = (value: string) => {
    setSelectedPhase(value);
    // setModule({
    //   ...module,
    //   phaseName: value,
    // });
  };

  const handleSubmit = () => {
    if (!modulejEditObj?.modID) {
      alert("you can not edit directly from here");
    } else {
      if (
        selectedProject === "" ||
        selectedPhase === "" ||
        selectedModule === ""
      ) {
        alert("please fill all credentials");
      } else {
        const data = {
          projectName: selectedProject,
          phaseName: selectedPhase,
          modules: selectedModule,
        };

        axios
          .put(
            `http://localhost:5000/update/module/${modulejEditObj.modID}`,
            data
          )
          .then((response) => {
            console.log(response, "999");
            if (response.data === "OK") {
              navigate("/view-module");

              alert(" module edited successfully");
            }
          })
          .catch((error) => {
            console.log(error, "8888");
          });
      }
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
              <p className="add-heading">Edit Module</p>
              <label className="add-label">
                Project Name<span style={{ color: "red" }}>*</span>
              </label>

              <select
                // onChange={handleChange}
                className="add-input"
                id="project"
                name="project"
                value={selectedProject}
                onChange={(e) => handleProjectChange(e.target.value)}
              >
                <option value="">Select a project</option>
                {projectNames.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>

              {/* <input className="add-input" name="projectName" value={module.projectName} onChange={handleModuleChange} /> */}
              <label className="add-label">
                Phase<span style={{ color: "red" }}>*</span>
              </label>
              {/* {selectedProject && ( */}
              <select
                className="add-input"
                id="phase"
                name="phase"
                value={selectedPhase}
                onChange={(e) => handlePhaseChange(e.target.value)}
              >
                <option value="">Select a phase</option>
                {phases
                  .filter((phase) => phase.projectName === selectedProject)
                  .map((phase) => {
                    return (
                      <React.Fragment key={phase.phaseID}>
                        <option value={phase.phases}>{phase.phases}</option>
                      </React.Fragment>
                    );
                  })}
              </select>

              <div>
                <label className="add-label">
                  Modules <span style={{ color: "red" }}>*</span>
                </label>

                <div style={{ display: "flex" }}>
                  <input
                    className="add-input"
                    type="text"
                    value={selectedModule}
                    onChange={handleModuleChange}
                  />
                </div>
              </div>
              <button className="add-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div style={{ marginTop: "50px", height: "80%", width: "100%" }}>
              {/* <EmployeeTable /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAddModule;
