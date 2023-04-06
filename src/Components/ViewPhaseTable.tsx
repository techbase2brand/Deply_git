import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

interface Props {
  phasejEditObj: Phases | undefined;
  setPhasejEditObj: React.Dispatch<React.SetStateAction<Phases | undefined>>;
}

const ViewPhaseTable: React.FC<Props> = ({
  phasejEditObj,
  setPhasejEditObj,
}) => {
  const [phaseArr, setphaseArr] = useState<Phases[]>([]);
  const [projectInfo, setProjectinfo] = useState<Project[]>([]);
  const [filteredProjectObj, setFilteredProjectObj] = useState<Project[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:5000/get/projects")
      .then((response) => {
        // sort the data array in reverse order based on ProID
        const sortedData = response.data.sort(
          (a, b) => Number(b.ProID) - Number(a.ProID)
        );
        setProjectinfo(sortedData);
      });
  }, []);

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const response = await axios.get<Phases[]>(
          "http://localhost:5000/get/phases"
        );
        const sortedData = response.data.sort((a, b) => b.phaseID - a.phaseID);
        const commonProjectNames = projectInfo.map((obj) => obj.projectName);
        const filteredSortedData = sortedData.filter((obj) =>
          commonProjectNames.includes(obj.projectName)
        );
        console.log(filteredSortedData, "filteredSortedData");
        setphaseArr(filteredSortedData);
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    };
    fetchPhases();
  }, [projectInfo]);

  useEffect(() => {
    console.log(phaseArr, "ggggggg---pp----");

    const filteredArr = projectInfo.filter((e) => {
      phaseArr.map((v) => console.log(v.projectName, "nbbvvcc---"));

      return e.projectName;
    });

    console.log(filteredArr, "sssgggg----");

    setFilteredProjectObj(filteredArr);
  }, []);

  const handleEdit = (phaseID: number) => {
    // console.log(phaseID,"gggg---yyyy");

    const filteredObj = phaseArr.filter((obj) => obj.phaseID === phaseID);
    console.log();

    setPhasejEditObj(filteredObj[0]);

    navigate("/EditAddPhase");

    // Handle edit functionality
  };

  const handleDelete = (phaseID: number) => {
    console.log(`Delete phase with id ${phaseID}`);

    axios
      .post(`http://localhost:5000/delete/phase/${phaseID}`)
      .then((response) => {
        console.log(response.data);
        // do something with the response data
      })
      .catch((error) => {
        console.log(error);
      });

      setphaseArr(phaseArr.filter((phase) => phase.phaseID !== phaseID));

    // Update filteredProjectObj
    setFilteredProjectObj(
      projectInfo.filter((project) =>
        phaseArr.some((phase) => phase.projectName === project.projectName)
      )
    );
  };


  const columns = [
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    {
      title: "phases",
      dataIndex: "phases",
      key: "phases",
      render: (text: string) => <div style={{}}>{text}</div>,
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: Phases) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.phaseID)}
          >
            {/* Edit */}
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.phaseID)}
          >
            {/* Delete */}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      {/* {phaseArr.length > 0 && (
  <Table
    columns={columns}
    dataSource={data}

    rowKey={(record) => record.projectName}
  />
)} */}
      {phaseArr.length > 0 && (
        <Table
          style={{ width: "80vw" }}
          dataSource={phaseArr.length > 0 ? phaseArr : data}
          columns={columns}
          // pagination={false}
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

export default ViewPhaseTable;
