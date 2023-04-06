import React, { useState, useContext, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, DatePickerProps } from "antd";
import { DatePicker, Space, Select, Radio, Tabs, RadioChangeEvent } from "antd";
import Menu from "./Menu";
import Navbar from "./Navbar";
import TableNavbar from "./TableNavbar";
import ViewprojectTable from "./ViewProjectTable";
import axios from "axios";
import { GlobalInfo } from "../App";
// import moment from "moment";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const { RangePicker } = DatePicker;

// import { DatePicker } from "antd";

interface Project {
  ProID: string | number;
  clientName: string;
  projectName: string;
  projectDescription: string;
}

interface Task {
  EvngTaskID: number;
  projectName: string;
  phaseName: string;
  module: string;
  task: string;
  actTime: string;
  estTime: string;
  upWorkHrs: number;
  employeeID: string;
  currDate: string;
}

interface Employee {
  EmpID: string | number;
  firstName: string;
  role: string;
  dob: string | Date;
  EmployeeID: string;
}

interface AssignedEmployees {
  PhaseAssigneeID: number;
  projectName: string;
  phaseName: string;
  assignedNames: string[];
  EmployeeID: string[];
}

interface AssignedEmployee {
  assignedNames: string[];
  EmployeeID: string[];
}

const AboutProject: React.FC = () => {
  const [projectsInfo, setProjectsInfo] = useState<Project[]>([]);
  const [EveningTasks, setEveningTasks] = useState<Task[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>({
    assignedNames: "",
    EmployeeID: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const [employees, setEmployees] = useState<any[]>([]);
  const [totalActTime, setTotalActTime] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [performer, setPerformer] = useState<string>("");
  const [activeButton, setActiveButton] = useState<number | null>(null);


  const { projEditObj, setProjEditObj } = useContext(GlobalInfo);

  console.log(employees, "nnnbbb----");
  // console.log(selectedEmployee, "lllllllllllll-----------");
  // console.log(selectedEmployee.employeeName, "sssss----------");

  const handleTotal = (days: number | null = null) => {
    let filteredTaskObject = EveningTasks;

    if (projectName) {
      filteredTaskObject = filteredTaskObject.filter(
        (e) => e.projectName === projectName
      );
    }

    if (selectedEmployee?.assignedNames) {
      const filteredID = employees.filter(
        (e) => e.EmployeeID === selectedEmployee.EmployeeID
      );
      filteredTaskObject = filteredTaskObject.filter(
        (e) => e.employeeID === filteredID[0]?.EmployeeID
      );

      setPerformer(selectedEmployee?.assignedNames)
    }

    if (selectedDateRange) {
      filteredTaskObject = filteredTaskObject.filter((task) => {
        const taskDate = new Date(task.currDate);
        return (
          (!selectedDateRange[0] || taskDate >= selectedDateRange[0]) &&
          (!selectedDateRange[1] || taskDate <= selectedDateRange[1])
        );
      });
    }

    if (days) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      filteredTaskObject = filteredTaskObject.filter((task) => {
        const taskDate = new Date(task.currDate);
        return taskDate >= startDate && taskDate <= endDate;
      });
    }

    const calculateTotalActTime = (tasks: Task[]) => {
      const total = tasks.reduce((total, task) => {
        return total + parseFloat(task.actTime);
      }, 0);

      const hours = Math.floor(total);
      const minutes = Math.round((total - hours) * 60);

      console.log(`${hours} hours, ${minutes} minutes`);

      // Update the totalActTime state
      setTotalActTime(`${hours}:${minutes.toString().padStart(2, "0")}`);
    };

    // Call calculateTotalActTime function with filteredTaskObject array
    calculateTotalActTime(filteredTaskObject);

    console.log(filteredTaskObject, "ggggg----");
  };

  const projectNames = projectsInfo.filter((e: Project) => {
    return e.projectName;
  });

  const handleButtonClick = (buttonIndex: number, days: number) => {
    setActiveButton(buttonIndex);
    setSelectedDays(days);
    setSelectedDateRange([null, null]); // Clear selectedDateRange
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const filteredTasks = EveningTasks.filter(
    (task: Task) => task.projectName === projectName
  );

  console.log(EveningTasks, "ggfff---");

  useEffect(() => {
    // Fetch employees from the backend API
    axios
      .get<AssignedEmployees[]>("http://localhost:5000/get/PhaseAssignedTo")
      .then((response) => {
        console.log(response.data);
        const sortedData = response.data.sort(
          (a, b) => Number(b.PhaseAssigneeID) - Number(a.PhaseAssigneeID)
        );

        const arr = sortedData
          .filter((e) => e.projectName === projectName)
          .map((e) => ({
            assignedNames: e.assignedNames,
            EmployeeID: e.EmployeeID,
          }));

        console.log(arr, "dddfffggg----");

        const unique_arr = sortedData
          .filter((e) => e.projectName === projectName)
          .reduce(
            (accumulator: AssignedEmployee[], current: AssignedEmployees) => {
              if (
                !accumulator.find(
                  (item) => item.assignedNames === current.assignedNames
                )
              ) {
                accumulator.push({
                  assignedNames: current.assignedNames,
                  EmployeeID: current.EmployeeID,
                });
              }
              return accumulator;
            },
            []
          );

        setEmployees(unique_arr);

        // setEmployees(unique_arr);

        //   setEmployees(arr);
      });
  }, [projectName]);

  //   console.log(employees,"gggppp====");

  const tasksByDate: { [key: string]: Task[] } = filteredTasks.reduce(
    (acc: { [key: string]: Task[] }, task: Task) => {
      const date = task.currDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    },
    {}
  );

  const dates = Object.keys(tasksByDate);

  const getMonthName = (month: number): string => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[month - 1];
  };

  const tasksByMonth: { [key: string]: number } = filteredTasks.reduce(
    (acc: { [key: string]: number }, task: Task) => {
      const [year, month] = task.currDate.split("-").slice(0, 2);
      const key = `${year}-${month}`;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += Number(task.actTime);
      return acc;
    },
    {}
  );

  const months = Object.keys(tasksByMonth);

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:5000/get/projects")
      .then((response) => {
        setProjectsInfo(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get<Task[]>("http://localhost:5000/get/addTaskEvening")
      .then((response) => {
        const arr = response?.data;

        // sort the data array in reverse order based on EvngTaskID
        const sortedData = arr.sort(
          (a: Task, b: Task) => Number(b.EvngTaskID) - Number(a.EvngTaskID)
        );
        setEveningTasks(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="emp-main-div">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          maxHeight: "100vh",
          backgroundColor: "#F7F9FF",
        }}
      >
        <div style={{ height: "8%" }}>
          <Navbar />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "90%",
            width: "100%",
          }}
        >
          <div className="menu-div">
            <Menu />
          </div>
          <div>
            <div style={{ width: "92%", marginLeft: "4.4%", marginTop: "5%", }}>
              <div  style={{display: 'flex', flexDirection:'row' }}>
              <p
                style={{
                  color: "#094781",
                  justifyContent: "flex-start",
                  fontSize: "32px",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                About Project
              </p>

              <button
    style={{
      marginLeft: "10px",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      cursor: "pointer",
    }}
    onClick={() => {
      setSelectedEmployee(null);
      setSelectedDateRange([null, null]);
      setSelectedButton(null);
      setSelectedDays(null);
      setTotalActTime('');
      setPerformer("");
    }}
  >
    <FontAwesomeIcon icon={faSync} size="lg" />
  </button>
  </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
                // className="proj-person"
              >
<div  style={{display:'flex', flexDirection:'row' ,height:'70px'}}>
<button
    style={{
      marginTop: "30px",
      backgroundColor: "#094781",
      color: "white",
      padding: "10px",
      width: "55px",
      borderRadius: "7px",
    }}
    onClick={() => handleTotal(selectedDays)}
  >
    Go
  </button>

        <div>

        {totalActTime && (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: 'space-around',
      alignItems: "center",
      margin: "20px 0",
      marginLeft: '16px',
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width:'17vw',
      marginTop:'30px'
    }}
  >
    {performer && (
      <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0" }}>
        {performer}
      </p>
    )}

    <span
      style={{
        marginLeft: "5px",
        marginRight: "5px",
        fontSize: "14px",
        fontWeight: "600",
      }}
    >
      Total Time:
    </span>
    <span style={{ fontSize: "14px", fontWeight: "600" ,}}>{totalActTime}</span>
  </div>
)}



        </div>
        </div>
               <div style={{marginTop:'40px',height:'2vh',marginLeft:'5px'}}>
                <h4 >Filters</h4>
               </div>

                <div style={{ marginTop: "2px" }} className="add-div">
                  <label className="add-label"></label>
                  <select
                    className="add-input"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    // placeholder="Select a project"
                  >
                    <option value="">Select a project</option>
                    {projectNames.map((project: any) => (
                      <option key={project.ProID} value={project.projectName}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                  {/* <button>daily</button> */}
                </div>
                <div style={{ marginTop: "10px" }} className="add-div">
                  <label className="add-label"></label>
                  <select
  className="add-input"
  value={selectedEmployee?.EmployeeID || ""}
  onChange={(e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      const foundEmployee = employees.find(
        (emp) => emp.EmployeeID === selectedValue
      );
      setSelectedEmployee(foundEmployee);
    } else {
      setSelectedEmployee(null);
      // setPerformer("");
    }
  }}
>
  <option value="" disabled>Select Employee</option>
  {employees.map((e, index) => (
    <option key={index} value={e.EmployeeID}>
      {e.assignedNames}
    </option>
  ))}
</select>


                  <div style={{ marginTop: "10px" }} className="add-div">
                    <label className="add-label"></label>
                    <RangePicker
                      className="add-input"
                      value={[
                        selectedDateRange[0]
                          ? dayjs(selectedDateRange[0])
                          : null,
                        selectedDateRange[1]
                          ? dayjs(selectedDateRange[1])
                          : null,
                      ]}
                      onChange={(dates, dateStrings) => {
                        setSelectedDateRange([
                          dates?.[0]?.toDate() || null,
                          dates?.[1]?.toDate() || null,
                        ]);
                        setSelectedButton(null); // Clear selectedButton
                        setSelectedDays(null); // Clear selectedDays
                      }}
                    />
                  </div>

                  <div style={{marginTop :'16px ', marginBottom:'16px', marginLeft:'90%'}}>OR</div>

                  <div>
                  <button
        onClick={() => handleButtonClick(0, 7)}
        style={{
          backgroundColor: activeButton === 0 ? "#094781" : "initial",
          color: activeButton === 0 ? "white" : "initial",
        }}
      >
        Last 7 Days
      </button>
      <button
        onClick={() => handleButtonClick(1, 30)}
        style={{
          backgroundColor: activeButton === 1 ? "#094781" : "initial",
          color: activeButton === 1 ? "white" : "initial",
        }}
      >
        Last 30 Days
      </button>
      <button
        onClick={() => handleButtonClick(2, 365)}
        style={{
          backgroundColor: activeButton === 2 ? "#094781" : "initial",
          color: activeButton === 2 ? "white" : "initial",
        }}
      >
        Last 365 Days
      </button>
                  </div>




                </div>




                {/* {dates.map((date) => (
        <div key={date}>
          <p>{date}</p>
          {tasksByDate[date].map((task) => (
            <p key={task.EvngTaskID}>{task.actTime}</p>
          ))}
        </div>
      ))} */}

                {/* {months.map((month) => {
  const [year, monthNum] = month.split("-");
  return (
    <div key={month}>
      <p>{`${getMonthName(Number(monthNum))} ${year}`}</p>
      <p>{`${tasksByMonth[month]} hours`}</p>
    </div>
  );
})} */}
                {/* <button></button> */}
              </div>
              {/* <ViewprojectTable
        projEditObj={projEditObj}
        setProjEditObj={setProjEditObj}
      /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
