import { useState } from 'react';
import useUserStore from '../../store/userStore';
import Skeleton from 'react-loading-skeleton';

export default function Header({ photosCount, followers, profile }) {
  const user = useUserStore((state) => state.user);
  const [followerCount, setFollowerCount] = useState(followers.length);

  return (
    <div className="grid grid-cols-3 my-12 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profile.username ? (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${profile.fullName} profile picture`}
            src={
              profile.avatarUrl
                ? profile.avatarUrl
                : '../public/images/avatars/default.png'
            }
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
        </div>
        <div className="container flex mt-4">
          {!profile.folowers || !profile.following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> posts
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {followerCount === 1 ? `follower` : `folowers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profile.following?.length}</span>{' '}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profile.fullName ? (
              <Skeleton count={1} height={24} />
            ) : (
              profile.fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
