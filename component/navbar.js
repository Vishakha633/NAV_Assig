import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes ,useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Form from './addUser';
import Home from './home';
import AboutUs from './aboutUs';
import Tablle from './tablle';
// import UserTable from './C:\Users\vishakha\Assignment-1 NAV\assign\src\component\userTable.js';

 
const { Header, Content } = Layout;
 
const Navbar = () => {
    const location= useLocation();
    const currentPath = location.pathname ==='/'?'home':location.pathname.substring(1);
    return (
      <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[currentPath]}>
          {/* <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item> */}
          <Menu.Item key="user-table">
            <Link to="/user-table">User Table</Link>
          </Menu.Item>
          <Menu.Item key="add-user">
            <Link to="/add-user">Add a User</Link>
          </Menu.Item>
          <Menu.Item key="about-us">
            <Link to="/about-us">About Us</Link>
          </Menu.Item>
          
        </Menu>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Routes>
          <Route exact path="/user-table" element={ <Tablle />} />
          <Route path="/add-user" element={<Form />} />
          <Route path="/user-table" element={<Tablle />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Content>
    </Layout>
    );
};
 
export default Navbar;