import "../scss/Background.scss";
import { useEffect } from "react";

const Background = () => {
  useEffect(() => {
    const generateRandomStyles = () => {
      const size = Math.random() * 8 + 14; 
      const top = Math.random() * 100 + '%'; 
      const left = Math.random() * 100 + '%'; 
      const duration = Math.random() * 8 + 5 + 's'; 

      return { size, top, left, duration };
    };

    const createBlobs = () => {
      const blobCount = 4; 
      const background = document.getElementById('background');

      for (let i = 0; i < blobCount; i++) {
        const { size, top, left, duration } = generateRandomStyles();

        const blob = document.createElement('div');
        blob.className = 'blob';
        blob.style.width = `${size}vw`;
        blob.style.height = `${size}vw`;
        blob.style.top = top;
        blob.style.left = left;
        blob.style.animationDuration = duration;

        background.appendChild(blob);
      }
    };

    // Initialize blobs
    createBlobs();
  }, []);

  return <div id="background" className="background"></div>;
};

export default Background;
