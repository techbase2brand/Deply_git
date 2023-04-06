import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Select, Radio, Tabs, RadioChangeEvent } from "antd";
// import { Select, Space } from 'antd';
import Menu from "./Menu";
import Navbar from "./Navbar";
import EmployeeTable from "./EmployeeTable";
import EveningTasktable from "./EveningTasktable";
import EveningDashboardTable from "./EveningDashboardTable";
import axios from "axios";
import { format } from "date-fns";

type TabPosition = "morning" | "evening";

interface Employee {
  EmpID: number;
  firstName: string;
  role: string;
  dob: Date;
}

interface Task {
  EvngTaskID: number;
  projectName: string;
  phaseName: string;
  module: string;
  task: string;
  estTime: string;
  upWorkHrs: string;
  employeeID: string;
  currDate: string;
}








// const data: Employee[][] = [
//   [
//     { EmpID: 1, firstName: 'Alice', role: 'Manager', dob: new Date(1996, 1, 1) },
//     { EmpID: 2, firstName: 'Bob', role: 'Developer', dob: new Date(1991, 2, 2) },
//     { EmpID: 3, firstName: 'Charlie', role: 'Designer', dob: new Date(1986, 3, 3) },
//   ],
//   [
//     { EmpID: 4, firstName: 'Dave', role: 'Developer', dob: new Date(1981, 4, 4) },
//     { EmpID: 5, firstName: 'Eve', role: 'Designer', dob: new Date(1976, 5, 5) },
//   ],
//   [
//     { EmpID: 6, firstName: 'Frank', role: 'Manager', dob: new Date(1971, 6, 6) },
//   ]
// ];

const EveningDashboard: React.FC = () => {
  const [mode, setMode] = useState<TabPosition>("morning");
  const [data, setData] = useState<any>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [totalUpwork, setTotalUpWork] = useState<any>()
  const [ totalEstHrs, setTotalEstHrs] = useState<any>()
  const [ totalUpworkhrs, setTotalUpworkhrs] = useState<any>()



  console.log(totalUpwork,"uuuuu---------");




  const formattedDate = format(currentDate, "yyyy-MM-dd");

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  useEffect(() => {
    axios
      .get<Task[]>("http://localhost:5000/get/addTaskEvening")
      .then((response) => {
        console.log(response.data, "7777-----");

        const res = response.data.filter(
          (obj) => obj.currDate === formattedDate
        );

        const sortedData = res.sort((a, b) => Number(b.EvngTaskID) - Number(a.EvngTaskID));


        const result = sortedData.reduce((acc: Record<string, any>, obj) => {
          if (!acc[obj.employeeID]) {
            acc[obj.employeeID] = [];
          }
          acc[obj.employeeID].push(obj);
          return acc;
        }, {});

        setData(result);

        // sort the data array in reverse order based on ProID
        // const sortedData = response.data.sort((a, b) => Number(b.MrngTaskID) - Number(a.MrngTaskID));
        // setData(sortedData);
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
          // maxHeight:'90%'
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
            <div
              style={{
                display: "flex",
                width: "80%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <EveningDashboardTable
               totalUpwork ={totalUpwork }  setTotalUpWork ={setTotalUpWork} totalEstHrs={totalEstHrs}
               setTotalEstHrs={setTotalEstHrs} totalUpworkhrs={totalUpworkhrs}  setTotalUpworkhrs={setTotalUpworkhrs}
                />
            </div>
            <div style={{ width: "90%", height: "80%", marginTop: "3%" }}>
              <div style={{}}>
                <EveningTasktable data={data} totalUpwork ={totalUpwork }  setTotalUpWork ={setTotalUpWork}
                 totalEstHrs={totalEstHrs} setTotalEstHrs={setTotalEstHrs} totalUpworkhrs={totalUpworkhrs}  setTotalUpworkhrs={setTotalUpworkhrs}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EveningDashboard;
