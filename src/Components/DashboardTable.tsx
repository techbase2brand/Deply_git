import React, { useState } from "react";
import { Menu, Dropdown, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;



interface MorningDashboardTableProps {
  totalEstHrs: any;
  setTotalEstHrs: React.Dispatch<React.SetStateAction<any>>;
  setTotalUpWorkHrs: any;
  setSetTotalUpWorkHrs: React.Dispatch<React.SetStateAction<any>>;
}


const DashboardTable: React.FC<MorningDashboardTableProps> = ({totalEstHrs,setTotalEstHrs, setTotalUpWorkHrs ,setSetTotalUpWorkHrs}) => {
  const [manager, setManager] = useState("");
  const [teamLead, setTeamLead] = useState("");
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
  const [isEvening, setIsEvening] = useState(false);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("button1");

  const handleButton1Click = () => {
    setActiveButton("button1");
  };

  const handleButton2Click = () => {
    setActiveButton("button2");
    setIsEvening(!isEvening);
    const route = isEvening ? "/dashboard" : "/EveningDashboard";
    navigate(route);
  };

  const managerMenu = (
    <Menu onClick={({ key }) => setManager(key)}>
      <Menu.Item key="vikash">Vikash</Menu.Item>
      <Menu.Item key="tom">Tom</Menu.Item>
      <Menu.Item key="jerry">Jerry</Menu.Item>
      <Menu.Item key="trump">Trump</Menu.Item>
    </Menu>
  );

  const teamLeadMenu = (
    <Menu onClick={({ key }) => setTeamLead(key)}>
      <Menu.Item key="ajay">Ajay</Menu.Item>
      <Menu.Item key="suresh">Suresh</Menu.Item>
      <Menu.Item key="ramesh">Ramesh</Menu.Item>
    </Menu>
  );

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setDate(date);
    }
  };

  const handleMorningEveningButtonClick = () => {
    setIsEvening(!isEvening);
    const route = isEvening ? "/dashboard" : "/EveningDashboard";
    navigate(route);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "85vw",
        marginTop: "3%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* <Dropdown overlay={managerMenu}>
          <Button className="nav-dropDown" style={{ width: "120px" }}>
            Manager: {manager}
          </Button>
        </Dropdown>
        <Dropdown overlay={teamLeadMenu}>
          <Button className="nav-dropDown" style={{ paddingInline: "10px" }}>
            Team Lead: {teamLead}
          </Button>
        </Dropdown>
        <Button
          type="primary"
          className="go-btn"
          style={{ width: "50px", paddingInline: "10px" }}
        >
          Go
        </Button> */}
        {/* <Button
        className="nav-proj-btn"
          type="primary"


          onClick={handleMorningEveningButtonClick}
          style={{ paddingInline: '10px' , backgroundColor: isEvening ? 'black' : 'red',
          color: isEvening ? 'white' : 'black',}}
        >
          {isEvening ? 'Morning' : 'Evening'}
        </Button> */}

        <div style={{display:'flex', flexDirection:'row',}}>
          <button
          style={
            {backgroundColor:'royalBlue', padding:"8px" , borderRadius:'5px 0px 0px 5px'}
          }
            onClick={handleButton1Click}
            className={activeButton === "button1" ? "redButton" : ""}
          >
            Morning
          </button>
          <button
            style={
              { padding:"8px", borderRadius:'0px 5px 5px 0px'}
            }
            onClick={handleButton2Click}
            className={activeButton === "button2" ? "redButton" : ""}
          >
            Evening
          </button>
        </div>
        <DatePicker
          value={date}
          className="nav-date"
          style={{
            background: "#FFFFFF",
            border: "1px solid #BEBEBE",
            borderRadius: "99px",
            width: "120px",
          }}
          onChange={handleDateChange}
        />
        {/* <Button className="nav-proj-btn" type="primary"   onClick={handleMorningEveningButtonClick} style={{ marginLeft: 8 }}>
        {isEvening ? 'Evening' : 'Morning'} setTotalUpWorkHrs
        </Button> */}
        <span className="nav-hrs-estimate"> Est. Time : {totalEstHrs} </span>
        <span className="nav-hrs-estimate"> Upwork. Time  : {setTotalUpWorkHrs} </span>

        {/* </div> */}
      </div>
    </div>
  );
};

export default DashboardTable;
