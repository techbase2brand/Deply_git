import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface Modules {
  modID : number;
  projectName: string;
  phaseName: string;
  modules: string[];

}

interface Props {
  modulejEditObj: Modules | undefined;
  setModulejEditObj: React.Dispatch<React.SetStateAction<Modules | undefined>>;
}

const data: Modules[] = [
  {
    modID : 0,
    projectName: "",
    phaseName: "",
    modules:[ "", ""]

  },

];

const ViewModuleTable: React.FC<Props> = ({modulejEditObj,setModulejEditObj}) => {
  const [modulesArr, setModulesArr] = useState<Modules[]>([]);
  const navigate = useNavigate();


  console.log(modulesArr,"uuuu");


  useEffect(() => {
    // Fetch employees from the backend API
    axios.get<Modules[]>("http://localhost:5000/get/modules").then((response) => {
      console.log(response.data);
      const sortedData = response.data.sort((a, b) => Number(b.modID) - Number(a.modID));

      setModulesArr(sortedData);
    });
  }, []);







  const handleEdit = (modID: number) => {
    // Handle edit functionality
    const filteredObj = modulesArr.filter((obj)=>obj.modID === modID)
    console.log();

    setModulejEditObj(filteredObj[0])

    navigate("/EditAddModule");
  };

  const handleDelete = (modID: string) => {
    console.log(`Delete employee with id ${modID}`);
    // Handle delete functionality
    axios.delete(`http://localhost:5000/delete/module/${modID}`)
    .then(response => {
      console.log(response.data,"88------");
      // do something with the response data
    setModulesArr(modulesArr.filter((module) => module.modID !== Number(modID)))
    })
    .catch(error => {
      console.log(error);
      // handle the error
    });




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
      title: "modules",
      dataIndex: "modules",
      key: "modules",
      render: (text: string) => <div style={{}}>{text}</div>,
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: Modules) => (
        <span>
         <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.modID)}>

            {/* Edit */}
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.modID.toString())}>

            {/* Delete */}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
    {modulesArr.length > 0 && (
      <Table
      style={{width:'80vw'}}
      dataSource={modulesArr.length > 0 ? modulesArr : data}
      columns={columns}
      // Add background color to the table header row
      rowClassName={() => "header-row"}

    />
    )}
{/* <div style={{marginTop:'0px', marginLeft:'38%'}}>
    <span style={{}}> total hrs : </span>
    <span style={{marginLeft:'4%'}}>  500</span>

    <span style={{marginLeft:'18%'}}>  800</span>
    </div> */}
    </>

  );
};

export default ViewModuleTable;
