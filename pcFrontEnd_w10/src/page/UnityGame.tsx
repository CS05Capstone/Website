import React from 'react';

const UnityGameIframe = () => {
  return (
    <iframe
      
      src="./UnityGame/index.html" // Adjust the path to the index.html file of your Unity game
      width="100%" // Adjust the width as needed
      height="100%" // Adjust the height as needed
      frameBorder="0"
    ></iframe>
  );
};

export default UnityGameIframe;