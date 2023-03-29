import React, { useState } from 'react';
import AvatarUploader from '../components/avatarUploader';
import Modal from '../components/common/modal';
import useUserStore from '../store/userStore';

const Settings = () => {
  const user = useUserStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const handleShowModal = () => {
    return isOpen ? setIsOpen(false) : setIsOpen(true);
  };
  return (
    <>
      <div className="container flex mt-2 mx-auto max-w-screen-md justify-center items-center">
        <div className="flex w-4/8">
          <div className="flex items-center justify-between bg-white p-10 border border-gray-primary mb-4 rounded">
            <Modal
              onClick={handleShowModal}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              title="Choose new avatar"
            >
              <AvatarUploader user={user} />
            </Modal>
            <img
              className="rounded-full h-12 w-12 mx-5"
              src={
                user.avatarUrl !== undefined
                  ? `${user.avatarUrl}`
                  : `/images/avatars/default.png`
              }
              alt={`${user?.username} profile`}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
              }}
            />
            <div className="">
              <h3 className="mx-5">{user.username}</h3>
              <p
                role="button"
                onClick={handleShowModal}
                className="text-blue-primary font-medium mx-5"
              >
                Change profile photo
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
