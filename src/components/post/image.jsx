import React from 'react';

const Image = ({ photoUrl, caption }) => {
  return <img className='w-full' src={photoUrl}  alt={caption} />;
};

export default Image;
