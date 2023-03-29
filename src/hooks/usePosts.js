import { useState, useEffect } from 'react';
import { getPostsByFollowing } from '../utils/firebase';

export default function usePosts(user) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getTimelinePosts() {
      if (user?.following?.length > 0) {
        const userPosts = await getPostsByFollowing(user.following);
        userPosts.sort((a, b) => b.dateCreated - a.dateCreated);
        setPosts(userPosts.slice(0, 5));
      }
    }

    getTimelinePosts();
  }, [user?.userId, user?.following]);

  return posts;
}
