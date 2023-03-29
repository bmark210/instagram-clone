import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export async function fetchUserByEmail(emailAddress) {
  const collectionRef = collection(firestore, 'users');
  const q = query(collectionRef, where('email', '==', emailAddress));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No matching documents.');
    return null;
  } else {
    const user = querySnapshot.docs[0].data();
    const fetchedUser = { ...user };

    return fetchedUser;
  }
}

export async function fetchUserByUsername(username) {
  const collectionRef = collection(firestore, 'users');
  const q = query(collectionRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No matching documents.');
    return null;
  } else {
    const user = querySnapshot.docs[0].data();
    const fetchedUser = { ...user };
    return fetchedUser;
  }
}

export async function fetchUserById(userId) {
  const collectionRef = collection(firestore, 'users');
  const q = query(collectionRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No matching documents.');
    return null;
  } else {
    const user = querySnapshot.docs[0].data();

    return user;
  }
}

export async function getSuggestedProfiles(userId, following) {
  let q = query(collection(firestore, 'users'));

  if (following.length > 0) {
    q = query(q, where('userId', 'not-in', [...following, userId]));
  } else {
    q = query(q, where('userId', '!=', userId));
  }

  const querySnapshot = await getDocs(q);
  const profiles = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  return profiles.slice(0, 5);
}

export async function updateFollowingsByUser(userId, followingIdToAdd) {
  const userDocRef = doc(firestore, 'users', userId);
  await updateDoc(userDocRef, {
    following: arrayUnion(followingIdToAdd),
  });

  return followingIdToAdd;
}

export async function updateFolowersByUser(userId, folowerIdToAdd) {
  const userDocRef = doc(firestore, 'users', userId);
  await updateDoc(userDocRef, {
    folowers: arrayUnion(folowerIdToAdd),
  });

  return folowerIdToAdd;
}

export async function updateCommentsByPostId(docId, username, comment) {
  const userDocRef = doc(firestore, `posts/${docId}`);
  await updateDoc(userDocRef, {
    comments: arrayUnion({ username, comment }),
  });

  return { displayName, comment };
}

export async function fetchPostByPostId(postId) {
  const collectionRef = collection(firestore, 'posts');
  const q = query(collectionRef, where('postId', '==', postId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No matching documents in posts API.');
    return null;
  } else {
    const post = querySnapshot.docs[0].data();
    return post;
  }
}

export async function getPostsByFollowing(following) {
  const collectionRef = collection(firestore, 'posts');
  const q = query(collectionRef, where('userId', 'in', following));
  const querySnapshot = await getDocs(q);
  const userFollowedPosts = querySnapshot.docs.map((post) => ({
    ...post.data(),
  }));
  return userFollowedPosts;
}

export async function getPostsOfUser(userId) {
  const collectionRef = collection(firestore, 'posts');
  const q = query(collectionRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const usersPosts = querySnapshot.docs.map((post) => ({
    ...post.data(),
  }));
  return usersPosts;
}

export async function doesUsernameExists(username) {
  try {
    const q = query(
      collection(firestore, 'users'),
      where('username', '==', username.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    // return querySnapshot.size > 0;

    return querySnapshot.docs.map((user) => user.data().length > 0);
  } catch (error) {
    console.error(error);
    return false;
  }
}
