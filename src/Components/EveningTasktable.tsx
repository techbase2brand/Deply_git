import React, { useState, useEffect } from "react";

import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

interface Task {
    EvngTaskID: number;
  projectName: string;
  phaseName: string;
  module: string;
  task: string;
  estTime: string;
  upWorkHrs: number;
  employeeID: string;
  actTime: string;
}

interface Props {
  data: Task[][];
  totalUpwork: any;
  setTotalUpWork: React.Dispatch<React.SetStateAction<any>>;
  totalEstHrs :any;
  setTotalEstHrs: React.Dispatch<React.SetStateAction<any>>;
  totalUpworkhrs : any ;
  setTotalUpworkhrs : React.Dispatch<React.SetStateAction<any>>;


}


interface EmployeeTime {
  employeeID: string;
  formattedTime: string;
}

interface Employee {
  EmpID: string | number;
  firstName: string;
  role: string;
  dob: string | Date;
  EmployeeID: string;
}



const handleEdit = (EmpID: string | number) => {
  console.log(`Edit employee with id ${EmpID}`);
};

const EveningTasktable: React.FC<Props> = ({ data,totalUpwork, setTotalUpWork ,totalEstHrs ,setTotalEstHrs, totalUpworkhrs, setTotalUpworkhrs}) => {
  const [employeeArr, setEmployeeArr] = useState<any>([]);
  const [filteredEmployee, setFilteredEmployee] = useState<any>([]);


  const handleDelete = (EvngTaskID: number) => {
    // console.log(`Delete task with id ${MrngTaskID}`);

    axios
      .delete(`http://localhost:5000/delete/eveningDashboard/${EvngTaskID}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get<Employee[]>("http://localhost:5000/employees")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => Number(b.EmpID) - Number(a.EmpID)
        );

        console.log("-----------00000");
        console.log(data,"99999999---");


        // console.log(sortedData, "///////-----");

        // const employeeArray = sortedData?.map((e) => e.EmployeeID);
        setEmployeeArr(sortedData);

        // setData(sortedData)
      })
      .catch((error) => console.log(error));
  }, []);

  const arrayOfArray = Object.values(data);



  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Phase",
      dataIndex: "phaseName",
      key: "phaseName",
    },
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      //   render: (dob: string | Date) => new Date(dob).toLocaleDateString(),
    },
    {
      title: "Est time (hrs)",
      dataIndex: "estTime",
      key: "estTime",
    },
    {
        title: "Act time (hrs)",
        dataIndex: "actTime",
        key: "actTime",
      },
    {
      title: "UpWork(hrs)",
      dataIndex: "upWorkHrs",
      key: "upWorkHrs",
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_: any, record: Task) => (
    //     <span>
    //       <Button
    //         type="link"
    //         danger
    //         icon={<DeleteOutlined />}
    //         onClick={() => handleDelete(record.EvngTaskID)}
    //       >
    //         Delete
    //       </Button>
    //     </span>
    //   ),
    // },
  ];



  const totalMinutes = arrayOfArray.reduce((acc, curr) => {
    curr.forEach((obj) => {
      if (obj?.actTime) {
        const [hours, minutes] = obj.actTime.split(":").map(Number);
        const timeInMinutes = hours * 60 + minutes;
        acc += timeInMinutes;
      }
    });
    return acc;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

setTotalUpWork(formattedTime)

// localStorage.setItem('formattedTime', formattedTime);


const totalEstTime = arrayOfArray.reduce((acc, curr) => {
  curr.forEach((obj) => {
    if (obj?.estTime) {
      const [hours, minutes] = obj.estTime.split(":").map(Number);
      const timeInMinutes = hours * 60 + minutes;
      acc += timeInMinutes;
    }
  });
  return acc;
}, 0);

const hoursEst = Math.floor(totalEstTime / 60);
const minutesEst = totalEstTime % 60;
const formattedTimeEst = `${hoursEst}:${minutesEst.toString().padStart(2, "0")}`;

console.log(formattedTimeEst,"---------ggggg");

setTotalEstHrs(formattedTimeEst)

const totalMinutesUpworkhrs = arrayOfArray.reduce((acc, curr) => {
  curr.forEach((obj) => {
    if (obj?.actTime) {
      const [hours, minutes] = obj.actTime.split(":").map(Number);
      const timeInMinutes = hours * 60 + minutes;
      acc += timeInMinutes;
    }
  });
  return acc;
}, 0);

const hoursUpworkhrs = Math.floor(totalMinutesUpworkhrs / 60);
const minutesUpworkhrs = totalMinutesUpworkhrs % 60;
const formattedTimeUpworkhrs = `${hoursUpworkhrs}:${minutesUpworkhrs.toString().padStart(2, "0")}`;

setTotalUpworkhrs(formattedTimeUpworkhrs)


// estTime per object


const estTimeByEmployee = arrayOfArray.reduce((acc: any, curr: any) => {
  curr.forEach((obj: any) => {
    if (obj?.estTime) {
      const [hours, minutes] = obj.estTime.split(":").map(Number);
      const timeInMinutes = hours * 60 + minutes;
      if (!acc[obj.employeeID]) {
        acc[obj.employeeID] = 0;
      }
      acc[obj.employeeID] += timeInMinutes;
    }
  });
  return acc;
}, {});

const employeeTimes: EmployeeTime[] = [];

for (const employeeID in estTimeByEmployee) {
  const totalMinutes = estTimeByEmployee[employeeID];
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
  employeeTimes.push({ employeeID, formattedTime });
}

console.log(employeeTimes,"ffffgggggpppp-----");

// estTime per object end

// per object upworkTime

const upWorkByEmployee = arrayOfArray.reduce((acc: any, curr: any) => {
  curr.forEach((obj: any) => {
    if (obj?.upWorkHrs) {
      const [hours, minutes] = obj.upWorkHrs.split(":").map(Number);
      const timeInMinutes = hours * 60 + minutes;
      if (!acc[obj.employeeID]) {
        acc[obj.employeeID] = 0;
      }
      acc[obj.employeeID] += timeInMinutes;
    }
  });
  return acc;
}, {});

const employeeUpworkTimes: EmployeeTime[] = [];

for (const employeeID in upWorkByEmployee) {
  const totalMinutes = upWorkByEmployee[employeeID];
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
  employeeUpworkTimes.push({ employeeID, formattedTime });
}

console.log(employeeTimes,"ffffggggg-----");


// per object upworkTime end



// per object actTime

const actTimeByEmployee = arrayOfArray.reduce((acc: any, curr: any) => {
  curr.forEach((obj: any) => {
    if (obj?.actTime) {
      const [hours, minutes] = obj.actTime.split(":").map(Number);
      const timeInMinutes = hours * 60 + minutes;
      if (!acc[obj.employeeID]) {
        acc[obj.employeeID] = 0;
      }
      acc[obj.employeeID] += timeInMinutes;
    }
  });
  return acc;
}, {});

const employeeactTimes: EmployeeTime[] = [];

for (const employeeID in actTimeByEmployee) {
  const totalMinutes = actTimeByEmployee[employeeID];
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
  employeeactTimes.push({ employeeID, formattedTime });
}

console.log(employeeTimes,"ffffggggg-----");


// per object actTime end

const tables = arrayOfArray.map((e) => {
    const arr = employeeArr.filter((emp: any) => {
      return emp.EmployeeID === e[0].employeeID;
    } );

    const filteredEstTime = employeeTimes.filter((obj )=> obj.employeeID === e[0].employeeID)

    const filteredUpworkTime = employeeUpworkTimes.filter((obj )=> obj.employeeID === e[0].employeeID)
    const filteredactTime = employeeactTimes.filter((obj )=> obj.employeeID === e[0].employeeID)

 return (
      <div key={e[0].EvngTaskID}>
        <div  style={{display:"flex", flexDirection: "column"}}>
        <p>{arr[0]?.firstName}</p>
        <div  style={{display:"flex", flexDirection: "row", float:"right" , justifyContent:'flex-end', marginRight:'12vw'}}>
        <p style={{marginRight:'2vw'}}>{filteredEstTime[0]?.formattedTime}</p>
        <p style={{marginLeft:'5vw'}}>{filteredactTime[0]?.formattedTime}</p>

        <p style={{marginLeft:'7vw'}}>{filteredUpworkTime[0]?.formattedTime}</p>
        </div>
        </div>

        <Table
          dataSource={e}
          columns={columns}
          pagination={false}
          rowClassName={() => "header-row"}
        />
      </div>
    );
  });

  return <>{tables}</>;
};
export default EveningTasktable;
