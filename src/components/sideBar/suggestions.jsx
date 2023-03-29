import React, { useEffect, useState } from 'react';
import { getSuggestedProfiles } from '../../utils/firebase';
import SuggestedProfile from './suggestedProfile';
import Skeleton from 'react-loading-skeleton';
import useUserStore from '../../store/userStore';

const Suggestions = () => {
  const [profiles, setProfiles] = useState(null);
  const user = useUserStore((state) => state.user);
  const following = user.following;

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(user.userId, user.following);
      setProfiles(response);
    }
    if (user) {
      suggestedProfiles();
    }
  }, [following]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.userId}
            profileDocId={profile.userId}
            avatarUrl={profile.avatarUrl}
            username={profile.username}
            profileId={profile.userId}
            userId={profile.userId}
            loggedInUserDocId={profile.userId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;
