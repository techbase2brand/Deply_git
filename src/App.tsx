import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Components/Login";
import AppMenu from "./Components/Menu";
import EmployeeForm from "./Components/EmployeeForm";
import EmployeeList from "./Components/EmployeeList";
import Dashboard from "./Components/Dashboard";
import EveningDashboard from "./Components/EveningDashboard";
import AddProject from "./Components/AddProject";
import AddPhase from "./Components/AddPhase";
import AddModule from "./Components/AddModule";
import ViewProject from "./Components/ViewProject";
import ViewPhase from "./Components/ViewPhase";
import ViewModule from "./Components/ViewModule";
import TableNavbar from "./Components/TableNavbar";
import AddMorningTask from "./Components/AddMorningTask";
import AddEveningTask from "./Components/AddEveningTask";
import PhaseAssignedTo from "./Components/PhaseAssignedTo";
import ViewPhaseAssign from "./Components/ViewPhaseAssign";
import EditAddPhase from "./Components/EditAddPhase";
import EditAddModule from "./Components/EditAddModule";
import AboutProject from "./Components/AboutProject";

export const GlobalInfo = createContext<any>({});

const App: React.FC = () => {
  const [empObj, setEmpObj] = useState<any>();
  const [projEditObj, setProjEditObj] = useState<any>();
  const [phasejEditObj, setPhasejEditObj] = useState<any>();
  const [modulejEditObj, setModulejEditObj] = useState<any>();
  // const [modulejEditObj,setModulejEditObj] = useState<any>()

  return (
    <Router>
      <GlobalInfo.Provider
        value={{
          empObj,
          setEmpObj,
          projEditObj,
          setProjEditObj,
          phasejEditObj,
          setPhasejEditObj,
          modulejEditObj,
          setModulejEditObj,
        }}
      >
        <Routes>
          {/* <AppMenu /> */}

          <Route path="/" element={<Login />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/EveningDashboard" element={<EveningDashboard />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/add-phase" element={<AddPhase />} />
          <Route path="/add-module" element={<AddModule />} />
          <Route path="/view-project" element={<ViewProject />} />
          <Route path="/view-phase" element={<ViewPhase />} />
          <Route path="/view-module" element={<ViewModule />} />
          <Route path="/table-navbar" element={<TableNavbar />} />
          <Route path="/add-morning-task" element={<AddMorningTask />} />
          <Route path="/add-evening-task" element={<AddEveningTask />} />
          <Route path="/PhaseAssignedTo" element={<PhaseAssignedTo />} />
          <Route path="/PhaseAssignedTo" element={<PhaseAssignedTo />} />
          <Route path="/ViewPhaseAssign" element={<ViewPhaseAssign />} />
          <Route path="/EditAddPhase" element={<EditAddPhase />} />
          <Route path="/EditAddModule" element={<EditAddModule />} />
          <Route path="/AboutProject" element={<AboutProject />} />
        </Routes>
      </GlobalInfo.Provider>
    </Router>
  );
};

export default App;
