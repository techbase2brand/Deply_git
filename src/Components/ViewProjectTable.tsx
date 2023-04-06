import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Project {
  ProID: string | number;
  clientName: string;
  projectName: string;
  projectDescription: string;
}

interface Props {
  projEditObj: Project | undefined;
  setProjEditObj: React.Dispatch<React.SetStateAction<Project | undefined>>;
}

const ViewProjectTable: React.FC<Props> = ({ projEditObj, setProjEditObj }) => {
  const [data, setData] = useState<Project[]>([]);
  const navigate = useNavigate();

  console.log(data, "-------");

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:5000/get/projects")
      .then((response) => {
        // sort the data array in reverse order based on ProID
        const sortedData = response.data.sort(
          (a, b) => Number(b.ProID) - Number(a.ProID)
        );
        setData(sortedData);
      });
  }, []);

  const handleEdit = (ProID: string | number) => {
    console.log(ProID, "kkkkkkgggg---");

    const filteredObj = data.filter((obj) => obj.ProID === ProID);
    console.log();

    setProjEditObj(filteredObj[0]);

    navigate("/add-project");
  };

  const handleDelete = (projectId: string | number) => {
    console.log(`Delete project with id ${projectId}`);

    const deletedObj = data.find((e) => e.ProID === projectId);


 console.log(deletedObj,"ggggg-----");


 axios
 .post("http://localhost:5000/delete/project", {projectName:deletedObj?.projectName})
 .then((response) => {
   console.log(response.data);
   setData(data.filter((project) => project.projectName !== deletedObj?.projectName));
 })
 .catch((error) => {
   console.log(error);
 });
  };

  const columns = [
    {
      title: "Client",
      dataIndex: "clientName",
      key: "clientName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: Project) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.ProID)}
          >
            {/* Edit */}
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.ProID)}
          ></Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table
        style={{ width: "80vw" }}
        dataSource={data}
        columns={columns}
        rowClassName={() => "header-row"}
      />
    </>
  );
};

export default ViewProjectTable;
