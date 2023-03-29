import React, { memo } from 'react';
// import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/userStore';

const User = () => {
  const user = useAuthStore((state) => state.user);
  if (user === null) return;
  return (
    <Link
      to={`/p/${user.username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 h-16 flex min-w-full"
          src={
            user.avatarUrl !== undefined
              ? `${user.avatarUrl}`
              : `/images/avatars/default.png`
          }
          alt="avatar"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="col-span-2">
        <p className="font-bold text-sm">{user.username}</p>
        <p className="text-sm">{user.fullName}</p>
      </div>
    </Link>
  );
};

export default memo(User);
