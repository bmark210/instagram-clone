import React from 'react';
import Post from './post';
import { usePostsStore } from '../store/postsStore';
import Skeleton from 'react-loading-skeleton';
import usePosts from '../hooks/usePosts';

const Timeline = ({ user }) => {
  const { posts, savePosts } = usePostsStore();
  const newPosts = usePosts(user);
  savePosts(newPosts);

  return (
    <div className="container col-span-2">
      {user.following === undefined ? (
        <Skeleton count={2} width={640} height={500} className="mb-5" />
      ) : user.following.length === 0 ? (
        <p className="flex justify-center font-bold">
          Follow other people to see posts
        </p>
      ) : posts.length ? (
        posts.map((post) => <Post key={post.postId} post={post} />)
      ) : (
        <p className="flex justify-center font-bold">
         Your friends doesn't created posts yet.
        </p>
      )}
    </div>
  );
};

export default Timeline;
