import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

    interface AssignedEmployees {
        PhaseAssigneeID : number,
        projectName: string;
        phaseName: string;
        assignedNames: string[]; // add the assignedNames property
    }

const data: AssignedEmployees[] = [
  {
    PhaseAssigneeID : 0,
    projectName: "",
    phaseName: "",
    assignedNames:[ "", ""]

  },

];

const ViewPhaseassignedTable: React.FC = () => {
  const [modulesArr, setModulesArr] = useState<AssignedEmployees[]>([]);

  console.log(modulesArr,"uuuu");


  useEffect(() => {
    // Fetch employees from the backend API
    axios.get<AssignedEmployees[]>("http://localhost:5000/get/PhaseAssignedTo").then((response) => {
      console.log(response.data);
      const sortedData = response.data.sort((a, b) => Number(b.PhaseAssigneeID) - Number(a.PhaseAssigneeID));

      setModulesArr(sortedData);
    });
  }, []);

  const handleEdit = (employeeId: string) => {
    // Handle edit functionality PhaseAssigneeID
  };

  const handleDelete = (PhaseAssigneeID: number) => {
    // console.log(`Delete employee with id ${modID}`);
    // Handle delete functionality
    axios.delete(`http://localhost:5000/delete/phaseAssignee/${PhaseAssigneeID}`)
    .then(response => {
      console.log(response.data,"88------");
      // do something with the response data
    setModulesArr(modulesArr.filter((module) => module.PhaseAssigneeID !== Number(PhaseAssigneeID)))
    })
    .catch(error => {
      console.log(error);
      // handle the error
    }
    );
//     // Handle delete functionality



//     // phase.phaseID !== phaseID
//     // ));




  };

  const columns = [

    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    {
      title: "phase",
      dataIndex: "phaseName",
      key: "phaseName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    {
      title: "assignedNames",
      dataIndex: "assignedNames",
      key: "assignedNames",
      render: (text: string) => <div style={{}}>{text}</div>,
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: AssignedEmployees) => (
        <span>
         {/* <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.PhaseAssigneeID)}>

          </Button> */}
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.PhaseAssigneeID)}>

          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table
      style={{width:'80vw'}}
      dataSource={modulesArr.length > 0 ? modulesArr : data}
      columns={columns}
      // Add background color to the table header row
      rowClassName={() => "header-row"}

    />
{/* <div style={{marginTop:'0px', marginLeft:'38%'}}>
    <span style={{}}> total hrs : </span>
    <span style={{marginLeft:'4%'}}>  500</span>

    <span style={{marginLeft:'18%'}}>  800</span>
    </div> */}
    </>

  );
};

export default ViewPhaseassignedTable;
