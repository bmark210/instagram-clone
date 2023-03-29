import React, { useEffect } from 'react';
import Timeline from '../components/timeline';
import { Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import SideBar from '../components/sideBar';
import useUserStore from '../store/userStore';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    document.title = 'Intsagram';
  }, []);

  if (user === null) return <Navigate to={ROUTES.LOGIN} />;
  return (
    <>
      <div className="bg-gray-background ">
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline user={user} />
          <SideBar />
        </div>
      </div>
    </>
  );
};



export default Dashboard;


