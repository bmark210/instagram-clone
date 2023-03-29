import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  updateFollowingsByUser,
  updateFolowersByUser,
} from '../../utils/firebase';
import useUserStore from '../../store/userStore';

const SuggestedProfile = ({ username, avatarUrl, userId }) => {
  const [followed, setFollowed] = useState(false);
  const { user, updateFollowings } = useUserStore();
  async function handleFollowUser() {
    setFollowed(true);
    const newFollowing = await updateFollowingsByUser(user.userId, userId); // updateFollowings here
    updateFollowings(newFollowing);
    await updateFolowersByUser(userId, user.userId); // updateFolowers here
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <Link to={`/p/${username}`}>
        <div className="flex items-center justify-between">
          <img
            className="rounded-full w-8 h-8 flex mr-3"
            src={
              avatarUrl !== undefined
                ? `${avatarUrl}`
                : `/images/avatars/default.png`
            }
            alt=""
            onError={(e) => {
              e.target.src = `/images/avatars/default.png`;
            }}
          />

          <p className="font-bold text-sm">{username}</p>
        </div>
      </Link>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};
export default SuggestedProfile;
