import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { firestore } from '../lib/firebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import useUserStore from '../store/userStore';
import { useRef } from 'react';

const CreateNewPost = () => {
  const user = useUserStore((state) => state.user);
  const inputRef = useRef(null);
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const createNewPost = async (event) => {
    event.preventDefault();

    const usersCollectionRef = collection(firestore, 'posts');

    setIsUploading(true);
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `photosForPosts/${user.username}/${Date.now()}`
    );

    await uploadBytes(storageRef, photo);
    const downloadUrl = await getDownloadURL(storageRef);

    const newPost = {
      avatarUrl: downloadUrl,
      caption: caption,
      dateCreated: Date.now(),
      userId: user.userId,
      likes: [],
    };
    
    await addDoc(usersCollectionRef, newPost);

    const q = query(
      usersCollectionRef,
      where('dateCreated', '==', newPost.dateCreated)
    );
    const querySnapshot = await getDocs(q);
    const postId = querySnapshot.docs[0].id;
    const userRef = doc(firestore, `posts/${postId}`);
    await setDoc(userRef, { postId }, { merge: true });

    setPhoto(null);
    setCaption('');
    setIsUploading(false);
  };

  const handlePhotoChange = (event) => {
    if (event.target.files.length) {
      setPhoto(event.target.files[0]);
    }
  };

  if (isUploading) return <h3>Uploading</h3>;
  return (
    <div className="flex-row justify-between items-center">
      <input
        ref={inputRef}
        id="photo-input"
        type="file"
        style={{ display: 'none' }}
        onChange={handlePhotoChange}
      />
      <label
        role="button"
        className="bg-blue-primary
      text-white mr-3 px-4 h-2 border pb-2 border-gray-primary rounded font-bold"
        htmlFor="photo-input"
      >
        upload photo for post
      </label>
      <input
        aria-label="Enter some caption"
        id="caption-input"
        type="text"
        placeholder="Caption"
        className="text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary rounded mb-2"
        onChange={({ target }) => setCaption(target.value)}
        value={caption}
      />
      {(photo || isUploading) && (
        <button
          onClick={createNewPost}
          type="submit"
          className={`bg-blue-primary
              } text-white w-full rounded h-8 font-bold
            ${!photo && 'opacity-50'}`}
        >
          Create new post
        </button>
      )}
    </div>
  );
};

export default CreateNewPost;
