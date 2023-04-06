import React, { useState, useEffect, useContext } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import Menu from "./Menu";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { GlobalInfo } from "../App";

interface IEmployee {
  firstName: string;
  lastName: string;
  jobPosition: string;
  email: string;
  phone: string;
  permanentaddress: string;
  currentAddress: string;
  dob: Date;
  role: string;
  parentPhone: string;
  EmployeeID: string;
  password: string;
  confirmPassword: string;
  EmpID: number;
}
// interface abc{
//   EmpID:number
// }

const EmployeeForm: React.FC = () => {
  const { empObj, setEmpObj } = useContext(GlobalInfo);

  console.log(empObj, "ggggghhhhhh----");

  const navigate = useNavigate();

  const [employee, setEmployee] = useState<IEmployee>({
    EmpID: 0,
    firstName: "",
    lastName: "",
    jobPosition: "",
    email: "",
    phone: "",
    permanentaddress: "",
    currentAddress: "",
    dob: new Date(),
    role: "",
    parentPhone: "",
    EmployeeID: "",
    password: "",
    confirmPassword: "",
  });

  const [data, setData] = useState<any>();

  useEffect(() => {
    if (empObj) {
      setEmployee(empObj);
    }
  }, []);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const id = parseInt(localStorage.getItem("EMPID") || "");

  console.log(id, "7-----");

  useEffect(() => {
    if (data && id) {
      let obj = data?.filter((e: IEmployee) => e?.EmpID === id);

      let obj1 = delete obj[0]?.EmpID;

      console.log(obj[0], "8----");
    }
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setEmployee({ ...employee, [name]: value });
  };

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setEmployee({ ...employee, [name]: value });
  // };

  const handleDateChange = (date: Date) => {
    setEmployee({ ...employee, dob: date });
  };

  useEffect(() => {
    axios
      .get<IEmployee[]>("http://localhost:5000/employees")
      .then((response) => setData(response.data))

      .catch((error) => console.log(error));
  }, []);

  console.log(employee, "gggggg--kkkkklll---");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (employee.password !== employee.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (empObj) {
      const data = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobPosition: employee.jobPosition,
        email: employee.email,
        phone: employee.phone,
        permanentaddress: employee.permanentaddress,
        currentAddress: employee.currentAddress,
        dob: employee.dob,
        role: employee.role,
        parentPhone: employee.parentPhone,
        EmployeeID: employee.EmployeeID,
        password: employee.password,
        confirmPassword: employee.confirmPassword,
      };

      axios
        .put(`http://localhost:5000/employeeUpdate/${empObj.EmpID}`, data)
        .then((response) => {
          console.log(response, "999");
          // setEmployee( employee: {} );
    navigate("/employee-list")

        })
        .catch((error) => {
          console.log(error, "8888");
        });

      return;
    } else {
      const data = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobPosition: employee.jobPosition,
        email: employee.email,
        phone: employee.phone,
        permanentaddress: employee.permanentaddress,
        currentAddress: employee.currentAddress,
        dob: employee.dob,
        role: employee.role,
        parentPhone: employee.parentPhone,
        EmployeeID: employee.EmployeeID,
        password: employee.password,
        confirmPassword: employee.confirmPassword,
      };

      axios
        .post("http://localhost:5000/create", data)
        .then((response) => {
          console.log(response, "999");
    navigate("/employee-list")

        })
        .catch((error) => {
          console.log(error, "8888");
        });
    }

    // console.log(employee);
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
          <div className="form-container">
            <div className="form-div">
              <h2
                style={{
                  color: "#094781",
                }}
              >
                {" "}
                Add new Employee
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="emp-div-flex">
                  <div className="form-group">
                    <label className="emp-label">First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={employee.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="emp-label">Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={employee.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="emp-label">Job Position:</label>
                  {/* <input
                  type="text"
                  name="jobPosition"
                  className="form-control"
                  value={employee.jobPosition}
                  onChange={handleInputChange}
                  required
                  style={{width:"95%"}}

                /> */}

                  <div style={{ width: "95%" }} className="form-control">
                    <select
                      name="jobPosition"
                      value={employee.jobPosition}
                      onChange={handleInputChange}
                      required
                      style={{ outline: "none", border: "none" }}
                    >
                      <option value="">-- Select position --</option>
                      <option value="Manager">Manager</option>
                      <option value="Developer">Employee</option>
                      <option value="Designer">CEO</option>
                      <option value="Tester">HR</option>
                    </select>
                  </div>
                </div>
                <div className="emp-div-flex">
                  <div className="form-group">
                    <label className="emp-label">Email Address:</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={employee.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="emp-label">Phone:</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={employee.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="emp-div-flex">
                  <div className="form-group">
                    <label className="emp-label">Permanent Address:</label>
                    <input
                      name="permanentaddress"
                      className="form-control"
                      value={employee.permanentaddress}
                      onChange={handleInputChange}
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="emp-label">Current Address:</label>
                    <input
                      name="currentAddress"
                      className="form-control"
                      value={employee.currentAddress}
                      onChange={handleInputChange}
                      required
                    ></input>
                  </div>
                </div>
                <div className="emp-div-flex">
                  <div
                    style={{ marginTop: "8px" }}
                    // className="form-group"
                  >
                    <label className="emp-label">Date of Birth:</label>
                    {/* <br /> */}
                    {/* <DatePicker
          selected={employee.dateOfBirth}
          onChange={handleDateChange}
          className="form-control"
          dateFormat="dd/MM/yyyy" */}
                    {/* /> */}
                    <div
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1.69622px solid #D8D6D6",
                        borderRadius: "4.24055px",
                        width: "14.5vw",
                      }}
                      // direction="vertical"
                      // style={{height:"4%"}}

                      // style={{
                      //   padding:
                      // }}
                      //  style={{marginBottom:"16px"}}
                      // style={{outline:'none', border:'none'}}
                    >
                      <DatePicker
                        className="form-control"
                        style={{ outline: "none", border: "none" }}
                        onChange={onChange}
                      />
                      {/* <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" /> */}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="emp-label">Role:</label>
                    <div className="form-control">
                      <select
                        name="role"
                        value={employee.role}
                        onChange={handleInputChange}
                        required
                        style={{ outline: "none", border: "none" }}
                      >
                        <option value="">-- Select Role --</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Tester">Tester</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="emp-div-flex">
                  <div className="form-group">
                    <label className="emp-label">Parent's Phone Number:</label>
                    <input
                      // style={{
                      //   padding: "5%",
                      //   borderRadius: "5px",
                      //   outline: "none",
                      //   backgroundColor: "white",
                      // }}
                      type="tel"
                      name="parentPhone"
                      className="form-control"
                      value={employee.parentPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="emp-label">Employee ID:</label>
                    <input
                      // style={{
                      //   padding: "5%",
                      //   borderRadius: "5px",
                      //   outline: "none",
                      //   backgroundColor: "white",
                      // }}
                      type="text"
                      name="EmployeeID"
                      className="form-control"
                      value={employee.EmployeeID}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="emp-div-flex">
                  <div className="form-group">
                    <label className="emp-label">Password:</label>
                    <input
                      // style={{
                      //   padding: "5%",
                      //   borderRadius: "5px",
                      //   outline: "none",
                      //   backgroundColor: "white",
                      // }}
                      type="password"
                      name="password"
                      className="form-control"
                      value={employee.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="emp-label">Confirm Password:</label>
                    <input
                      // style={{
                      //   padding: "5%",
                      //   borderRadius: "5px",
                      //   outline: "none",
                      //   backgroundColor: "white",
                      // }}
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      value={employee.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <button
                  style={{
                    width: "45%",
                    height: "100%",
                    borderRadius: "5px",
                    backgroundColor: "#094781",
                    paddingRight: "10%",
                    paddingLeft: "10%",
                    color: "white",
                    textAlign: "center",
                    marginTop: "4%",
                    // backgroundColor: "#FFFFFF",
                    // border: "1.69622px solid #D8D6D6",
                    // borderRadius: "4.24055px",
                  }}

                  // type="primary"
                  // htmlType="submit"
                  // className="login-form-button"
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      width: "3vw",
                      marginLeft: "12px",
                    }}
                  >
                    Add employee
                  </p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
