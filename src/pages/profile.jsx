import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { fetchUserByUsername, getPostsOfUser } from '../utils/firebase';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/profile';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const user = await fetchUserByUsername(username);
      const posts = await getPostsOfUser(user.userId);
      setPosts(posts);
      if (user?.userId) {
        setUser(user);
      } else {
        return navigate((to = ROUTES.NOTFOUND), { push: true });
      }
    }

    checkUserExists();
  }, [username]);

  return user?.username ? (
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} posts={posts}/>
      </div>
  ) : null;
}
export default Profile;
