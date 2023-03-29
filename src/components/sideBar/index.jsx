import React from 'react';
import User from './user';
import Suggestions from './suggestions';

const SideBar = () => {
  return (
    <div className="p-4">
      <User/>
      <Suggestions />
    </div>
  );
};

export default SideBar;
