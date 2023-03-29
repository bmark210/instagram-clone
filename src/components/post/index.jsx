import React, { useEffect, useState } from 'react';
import Header from './header';
import Image from './image';
import Actions from './actions';
import { fetchUserById } from '../../utils/firebase';
import Footer from './Footer';
import { useRef } from 'react';
import Comments from './comments';

const Post = ({ post }) => {
  const commentInput = useRef(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const user = await fetchUserById(post.userId);
      setUser(user);
    }

    fetchUser();
  }, [post?.userId]);

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={user.username} avatarUrl={user.avatarUrl} />
      <div className="flex items-center justify-center">
        <Image photoUrl={post.avatarUrl} caption={post.caption} />
      </div>
      <Actions
        likesArray={post.likes}
        userId={post.userId}
        likesLength={post.likes.length}
        postId={post.postId}
      />
      <Footer caption={post.caption} username={user.username} />
      <Comments
        docId={post.postId}
        comments={post.comments}
        posted={post.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;
