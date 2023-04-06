import { Input, Layout, Avatar, Badge } from "antd";
import { SearchOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems:'center',
        backgroundColor: "white",
      }}
      className="navbar"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "40%",
        }}
      >
        <div className="logo">
          <img src="./b2b.png" alt="Company Logo" />
        </div>

        <div className="search">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="search-icon" />}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "60%",
          float: "right",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        className="right-menu"
      >
        <div
          style={{
            width: "25%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Badge style={{ marginRight: "3%" }} count={5}>
            <BellOutlined className="notification-icon" />
          </Badge>
          <Avatar className="avatar" icon={<UserOutlined />} />
          <span className="username">Vikash Soni</span>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
