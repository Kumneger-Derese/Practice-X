import Header from './Header';
import SideBar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
};
export default Dashboard;
