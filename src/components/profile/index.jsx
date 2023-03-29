import React, { useEffect } from 'react';
import Header from './header';
import Photos from './photos';

export default function UserProfile({ user, posts }) {
  useEffect(() => {
    document.title = user.fullName ? user.fullName : 'Instagram';
  }, [user]);

  return (
    <>
      <Header
        photosCount={posts ? posts.length : 0}
        profile={user}
        followers={user.folowers}
      />
      <Photos photos={posts} />
    </>
  );
}
