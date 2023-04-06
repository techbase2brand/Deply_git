import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Space } from "antd";
import Menu from "./Menu";
import Navbar from "./Navbar";
import EmployeeTable from "./EmployeeTable";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Task {
  projectName: string;
  phaseName: string;
  module: string;
  task: string;
  estTime:  string;
  upWorkHrs:  string;
}


interface AssignedEmployees {
  PhaseAssigneeID : number,
  projectName: string;
  phaseName: string;
  assignedNames: string[]; // add the assignedNames property
}

interface Module {
  modID: number;

  projectName: string;
  phaseName: string;
  modules: string;
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
type Phase = {
  phaseID: number;
  projectName: string;
};

const AddModule: React.FC<any> = ({ navigation, classes }) => {
  // const navigate = useNavigate();
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [phases, setPhases] = useState<Phases[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [phaseAssignedArr, setPhaseAssignedArr] = useState<AssignedEmployees[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedPhase, setSelectedPhase] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [morningTask, setMorningTask] = useState<Task>({
    // clientName: "",
    projectName: "",
    phaseName: "",
    module: "",
    task: "",
    estTime:"",
    upWorkHrs: "",
  });

  const navigate = useNavigate();

  console.log(morningTask, "33------");


  useEffect(() => {
    // Fetch employees from the backend API
    axios.get<AssignedEmployees[]>("http://localhost:5000/get/PhaseAssignedTo").then((response) => {
      console.log(response.data);
      const sortedData = response.data.sort((a, b) => Number(b.PhaseAssigneeID) - Number(a.PhaseAssigneeID));

      setPhaseAssignedArr(sortedData);
    });
  }, []);






  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:5000/get/projects")
      .then((response) => {
        // setProjectNames(response.data.map((project) => project.projectName));
   const arr =      response.data.map((project) => project.projectName);

        console.log(arr,"ooo");




      });
  }, []);

  useEffect(() => {
    axios.get<Phases[]>("http://localhost:5000/get/phases").then((response) => {
      setPhases(response.data);
    });
  }, []);

  useEffect(() => {
    // Fetch employees from the backend API
    axios
      .get<Module[]>("http://localhost:5000/get/modules")
      .then((response) => {
        // console.log(response.data);
        const sortedData = response.data.sort(
          (a, b) => Number(b.modID) - Number(a.modID)
        );

        setModules(sortedData);
      });
  }, []);

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setMorningTask({
      ...morningTask,
      module: value,
    });
  };

  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
    const currentPhase = phases.find((phase) => phase.projectName === value);
    if (currentPhase) {
      setSelectedPhase(currentPhase.phases[0]);
      setMorningTask({
        projectName: value,
        phaseName: currentPhase.phases[0],
        module: "",
        task: "",
        estTime:"",
        upWorkHrs: "",
      });
    } else {
      setSelectedPhase("");
      setMorningTask({
        projectName: value,
        phaseName: "",
        module: "",
        task: "",
        estTime:"",
        upWorkHrs:"",
      });
    }
  };

  const handlePhaseChange = (value: string) => {
    setSelectedPhase(value);
    setMorningTask({
      ...morningTask,
      phaseName: value,
    });
  };

  const handleTaskChange = (value: string) => {
    setMorningTask({
      ...morningTask,
      task: value,
    });
  };

  const handleEstTimeChange = (value: string) => {
    setMorningTask({
      ...morningTask,
      estTime: value,
    });
  };

  const handleUpWorkHrsChange = (value: string) => {
    setMorningTask({
      ...morningTask,
      upWorkHrs: value,
    });
  };


  // function handleUpWorkHrsChange(value: number) {
  //   if (value >= 0) {
  //     setMorningTask({ ...morningTask, upWorkHrs: value });
  //   } else {
  //     // If the new value is less than zero, reset the input value to the current value.
  //     // This prevents the input value from being decreased below zero.
  //     setMorningTask({ ...morningTask, upWorkHrs: morningTask.upWorkHrs });
  //   }
  // }

  const handleSubmit = () => {
    axios.post("http://localhost:5000/create/addTaskMorning",morningTask )
    .then((response) => {

      if (response.data === "All fields are required.") {
        alert("All fields are required.");
      }else {
        navigate("/dashboard");
      }


      console.log(response.data); // log the response message
      // show a success message to the user
    })
    .catch((error) => {
      console.log(error.response.data); // log the error message
      // show an error message to the user
    });
    // Submit module data to server
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
            style={{ display: "flex", flexDirection: "column" ,}}
            className="form-container"
          >
            <div className="add-div">
              <p className="add-heading">Add Morning Task</p>
              <label className="add-label">Project Name</label>

              <select
                // onChange={handleChange}
                style={{width:'95%'}}
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
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',width:"95%"}}>
              <div style={{display:'flex', flexDirection:'column'}}>
              <label className="add-label">Phase</label>
              {/* {selectedProject &&  ( */}
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
                      console.log(phase, "77777777");

                      return (
                        <React.Fragment key={phase.phaseID}>
                          <option value={phase.phases}>{phase.phases}</option>
                        </React.Fragment>
                      );
                    })}
                </select>
              {/* )} */}
              </div>
              <div style={{display:'flex', flexDirection:'column'}}>
              <label className="add-label">Module</label>

              {/* {selectedProject && selectedPhase && ( */}
                <select
                  className="add-input"
                  id="module"
                  name="module"
                  value={selectedModule}
                  onChange={(e) => handleModuleChange(e.target.value)}
                >
                  <option value="">Select a module</option>
                  {modules
                    .filter((module) => module.phaseName === selectedPhase)
                    .map((module) => {
                      return (
                        <option key={module.modID} value={module.modules}>
                          {module.modules}
                        </option>
                      );
                    })}
                </select>
              </div>

              {/* )} */}
              </div>

              <div>
                <label className="add-label">task:</label>

                <div style={{ width: "89%" }} className="form-control">
                  <textarea
                    style={{ outline: "none", border: "none", maxWidth:'100%',  }}
                    // type="text"
                    name="task"
                    className="form-control"
                    value={morningTask.task}
                    onChange={(e) => handleTaskChange(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'94%'}}>
              <div className="form-group">
                <label className="add-label">Est. time :</label>
                <select
                style={{width:'16.8vw'}}
                  name="estTime"
                  className="form-control"
                  value={morningTask.estTime}
                  onChange={(e) => handleEstTimeChange((e.target.value))}

                  required
                >
                  <option value="">--Select Time--</option>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((hour) =>
                    [15, 30, 45].map((minute) => (
                      <option
                        key={`${hour}:${minute}`}
                        value={`${hour}:${minute}`}
                      >
                        {`${hour} hours ${minute} mins`}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="form-group">
                <label className="add-label">Upwork Hrs</label>
                <select
                style={{width:'16.8vw'}}
                  name="upWorkHrs"
                  className="form-control"
                  value={morningTask.upWorkHrs}
                  onChange={(e) => handleUpWorkHrsChange((e.target.value))}

                  required
                >
                  <option value="">--Select Time--</option>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((hour) =>
                    [15, 30, 45].map((minute) => (
                      <option
                        key={`${hour}:${minute}`}
                        value={`${hour}:${minute}`}
                      >
                        {`${hour} hours ${minute} mins`}
                      </option>
                    ))
                  )}
                </select>
              </div>
              </div>
              <button className="add-button" onClick={handleSubmit}>
                Add Task
              </button>
            </div>
            <div
              style={{ marginTop: "50px", height: "80%", width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModule;
