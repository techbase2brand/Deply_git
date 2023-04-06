import React, { useState, useEffect } from "react";

import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

interface Task {
  MrngTaskID: number;
  projectName: string;
  phaseName: string;
  module: string;
  task: string;
  estTime: string;
  upWorkHrs: number;
  employeeID: string;
}

interface EmployeeTime {
  employeeID: string;
  formattedTime: string;
}

interface Props {
  data: Task[][];
  totalEstHrs :any;
  setTotalEstHrs: React.Dispatch<React.SetStateAction<any>>
  setTotalUpWorkHrs: any;
  setSetTotalUpWorkHrs : React.Dispatch<React.SetStateAction<any>>
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

const TaskTable: React.FC<Props> = ({ data, totalEstHrs,setTotalEstHrs,setTotalUpWorkHrs ,setSetTotalUpWorkHrs}) => {
  const [employeeArr, setEmployeeArr] = useState<any>([]);
  const [arrayOfArray, setArrayOfArray] = useState<any>([]);

  const handleDelete = (MrngTaskID: number) => {
    // console.log(`Delete task with id ${MrngTaskID}`);

    axios
      .delete(`http://localhost:5000/delete/morningDashboard/${MrngTaskID}`)
      .then((response) => {
        console.log(response.data);
        // setData(data)
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
        console.log(sortedData, "///////-----");

        const employeeArray = sortedData?.map((e) => e.EmployeeID);
        setEmployeeArr(sortedData);

        // setData(sortedData)
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const arrays = Object.values(data);

    setArrayOfArray(arrays);
  }, [data]);

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
    //         onClick={() => handleDelete(record.MrngTaskID)}
    //       >
    //         Delete
    //       </Button>
    //     </span>
    //   ),
    // },x`x`
  ];


  const totalMinutes = arrayOfArray.reduce((acc : any, curr : any) => {
    curr.forEach((obj  : any) => {
      if (obj?.estTime) {
        const [hours, minutes] = obj.estTime.split(":").map(Number);
        const timeInMinutes = hours * 60 + minutes;
        acc += timeInMinutes;
      }
    });
    return acc;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

  console.log(formattedTime,"uuugggggg------");

setTotalEstHrs(formattedTime)

// per object estTime

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

console.log(employeeTimes,"ffffggggg-----");


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











const totalMinutesUpwork = arrayOfArray.reduce((acc : any, curr : any) => {
  curr.forEach((obj  : any) => {
    if (obj?.upWorkHrs) {
      const [hours, minutes] = obj?.upWorkHrs.split(":").map(Number);
      const timeInMinutes = hours * 60 + minutes;
      acc += timeInMinutes;
    }
  });
  return acc;
}, 0);

const hoursUpwork = Math.floor(totalMinutesUpwork / 60);
const minutessUpwork = totalMinutesUpwork % 60;
const formattedTimesUpwork = `${hoursUpwork}:${minutessUpwork.toString().padStart(2, "0")}`;

setSetTotalUpWorkHrs(formattedTimesUpwork);




  const tables = arrayOfArray.map((e: any) => {
    const arr = employeeArr.filter((emp: any) => {
      return emp.EmployeeID === e[0].employeeID;

    })
    const filteredEstTime = employeeTimes.filter((obj )=> obj.employeeID === e[0].employeeID)


      //employeeUpworkTimes

  const filteredUpworkTime = employeeUpworkTimes.filter((obj )=> obj.employeeID === e[0].employeeID)








    return (
      <div key={e[0].MrngTaskID}>
        <div  style={{display:"flex", flexDirection: "column"}}>
        <p>{arr[0]?.firstName}</p>
        <div  style={{display:"flex", flexDirection: "row", float:"right",justifyContent: 'flex-end' ,marginRight:'5vw'}}>

        <p>{filteredEstTime[0]?.formattedTime}</p>
        <p
         style={{marginLeft:'10vw'}}
         >{filteredUpworkTime[0]?.formattedTime}</p>

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
export default TaskTable;
