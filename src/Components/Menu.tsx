import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  PlusOutlined,
  TableOutlined,
  ScheduleOutlined,
  AppstoreOutlined,
  MenuOutlined
} from '@ant-design/icons';

const AppMenu = () => {
  return (
    <Menu mode="inline">
      {/* <Menu.Item key="menu" icon={<MenuOutlined />}> */}
        {/* <Link to="/menu">Menu</Link> */}
      {/* </Menu.Item> */}
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="employee-form" icon={<UserOutlined />}>
        <Link to="/employee-form">Employee Form</Link>
      </Menu.Item>
      <Menu.Item key="employee-list" icon={<UserOutlined />}>
        <Link to="/employee-list">Employee List</Link>
      </Menu.Item>
      <Menu.Item key="add-project" icon={<PlusOutlined />}>
        <Link to="/add-project">Add Project</Link>
      </Menu.Item>
      <Menu.Item key="view-project" icon={<TableOutlined />}>
        <Link to="/view-project">View Project</Link>
      </Menu.Item>
      <Menu.Item key="add-phase" icon={<PlusOutlined />}>
        <Link to="/add-phase">Add Phase</Link>
      </Menu.Item>
      <Menu.Item key="view-phase" icon={<TableOutlined />}>
        <Link to="/view-phase">View Phase</Link>
      </Menu.Item>

      <Menu.Item key="add-module" icon={<PlusOutlined />}>
        <Link to="/add-module">Add Module</Link>
      </Menu.Item>
      <Menu.Item key="view-module" icon={<TableOutlined />}>
        <Link to="/view-module">View Module</Link>
      </Menu.Item>
      <Menu.Item key="add-PhaseAssignedTo" icon={<PlusOutlined />}>
        <Link to="/PhaseAssignedTo">Phase Assigned to</Link>
      </Menu.Item>



      <Menu.Item key="ViewPhaseAssign" icon={<TableOutlined />}>
        <Link to="/ViewPhaseAssign">View Phase AssignedTo</Link>
      </Menu.Item>
      <Menu.Item key="AboutProject" icon={<TableOutlined />}>
        <Link to="/AboutProject">About Page</Link>
      </Menu.Item>
      {/* <Menu.Item key="table-navbar" icon={<TableOutlined />}>
        <Link to="/table-navbar">Table Navbar</Link>
      </Menu.Item> */}
      {/* <Menu.Item key="add-morning-task" icon={<ScheduleOutlined />}>
        <Link to="/add-morning-task">Add Morning Task</Link>
      </Menu.Item>
      <Menu.Item key="add-evening-task" icon={<ScheduleOutlined />}>
        <Link to="/add-evening-task">Add Evening Task</Link>
      </Menu.Item> */}
    </Menu>
  );
};

export default AppMenu;
