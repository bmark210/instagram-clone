import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ user }) => {
  useEffect(() => {
    document.title = 'Not Found - Instagram';
  });
  return (
    <div className="bg-gray-background ">
      <div className="mx-auto max-w-screen-lg mt-40">
        <p className="text-center font-bold text-2xl mb-5">
          Sorry, this page isn't available.
        </p>
        <h3 className="text-center text-lg">
          The link you followed may be broken, or the page may have been
          removed.
          <Link className="text-gray-medium" to={user ? '/' : '/login'}>
            Go back to Instagram.
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
